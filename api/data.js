const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  // Setup CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;
  const ghToken = process.env.GITHUB_TOKEN;
  const sheetUrl = process.env.GOOGLE_SHEET_URL || 'https://script.google.com/macros/s/AKfycbz-fWSD4VWqrb8vZqmMNCW9t8DV4UZTR1nWg_VJl71dn4wKHWVRnF49eK-tB2JJP6HuRg/exec';

  // 1. GET DATA
  if (req.method === 'GET') {
    // Check Google Spreadsheet first if configured
    if (sheetUrl) {
      try {
        const sRes = await fetch(sheetUrl);
        if (sRes.ok) {
          const sJson = await sRes.json();
          if (sJson && sJson.profile) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            return res.status(200).json(sJson);
          }
        }
      } catch (err) {
        console.error('Google Sheet Read Error:', err);
      }
    }

    // Check Vercel KV
    if (kvUrl && kvToken) {
      try {
        const kvRes = await fetch(`${kvUrl}/get/bale_homestay_data`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        if (kvRes.ok) {
          const kvJson = await kvRes.json();
          if (kvJson && kvJson.result) {
            const parsed = typeof kvJson.result === 'string' ? JSON.parse(kvJson.result) : kvJson.result;
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            return res.status(200).json(parsed);
          }
        }
      } catch (err) {
        console.error('KV Read Error:', err);
      }
    }

    // Fallback: Read local data.json
    try {
      const filePath = path.join(process.cwd(), 'data.json');
      const fileData = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Cache-Control', 'public, max-age=60');
      return res.status(200).json(JSON.parse(fileData));
    } catch (err) {
      return res.status(500).json({ error: 'Gagal membaca data.json', details: err.message });
    }
  }

  // 2. POST DATA
  if (req.method === 'POST') {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    }

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Payload tidak boleh kosong' });
    }

    // A. Save to Google Spreadsheet if configured
    if (sheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        return res.status(200).json({
          success: true,
          storage: 'google-sheets',
          message: 'Data berhasil disimpan langsung ke Google Spreadsheet!'
        });
      } catch (err) {
        console.error('Google Sheet Save Error:', err);
      }
    }

    // A. Save to Vercel KV if connected
    if (kvUrl && kvToken) {
      try {
        const saveRes = await fetch(`${kvUrl}/set/bale_homestay_data`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${kvToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (saveRes.ok) {
          return res.status(200).json({
            success: true,
            storage: 'vercel-kv',
            message: 'Data berhasil disimpan permanen ke Cloud Database Vercel KV!'
          });
        }
      } catch (err) {
        console.error('KV Save Error:', err);
      }
    }

    // B. Save to GitHub via GITHUB_TOKEN if configured
    if (ghToken) {
      try {
        const repo = 'rodiman-2024/balesembalun';
        const getSha = await fetch(`https://api.github.com/repos/${repo}/contents/data.json`, {
          headers: {
            Authorization: `token ${ghToken}`,
            'User-Agent': 'Bale-Admin-Vercel'
          }
        });

        let sha = null;
        if (getSha.ok) {
          const shaData = await getSha.json();
          sha = shaData.sha;
        }

        const base64Content = Buffer.from(JSON.stringify(payload, null, 2)).toString('base64');
        const commitBody = {
          message: 'chore: update homestay data via admin panel',
          content: base64Content,
          branch: 'main'
        };
        if (sha) commitBody.sha = sha;

        const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/data.json`, {
          method: 'PUT',
          headers: {
            Authorization: `token ${ghToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Bale-Admin-Vercel'
          },
          body: JSON.stringify(commitBody)
        });

        if (putRes.ok) {
          return res.status(200).json({
            success: true,
            storage: 'github',
            message: 'Data berhasil disimpan dan di-commit ke GitHub!'
          });
        }
      } catch (err) {
        console.error('GitHub Commit Error:', err);
      }
    }

    // C. Neither KV nor GITHUB_TOKEN is active in Vercel environment
    return res.status(200).json({
      success: false,
      fallback: 'localStorage',
      message: 'Cloud Storage belum terhubung. Perubahan disimpan di browser lokal.'
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
