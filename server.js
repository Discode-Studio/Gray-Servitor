const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

const client_id = 'b70cd9b55d674692a425a86a3890d0da'; // Remplacez par votre client ID Spotify
const client_secret = 'be9c95eaa5494d7c964aab0e58031746'; // Remplacez par votre client secret Spotify
const redirect_uri = 'https://Discode-Studio.github.io/Gray-Servitor/spotify.html'; // Votre URL de redirection

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email user-library-read user-modify-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      const refresh_token = body.refresh_token;

      const options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      request.get(options, (error, response, body) => {
        console.log(body);
      });

      res.redirect('/spotify.html#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } else {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
