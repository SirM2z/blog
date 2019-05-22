const nowJsonTemplate = `{
  "version": 2,
  "name": "blog",
  "alias": "www.ryanc.top",
  "builds": [
    {
      "src": "package.json",
      "use": "@now/static-build",
      "config": { "distDir": "public" }
    },
    {
      "src": "static/**",
      "use": "@now/static"
    }
  ],
  "routes": [
    {
      "src": "^/public/static/(.*)",
      "headers": { "cache-control": "public,max-age=31536000,immutable" }
    },
    {
      "src": "^/(.*).(css|js)",
      "headers": { "cache-control": "public,max-age=31536000,immutable" }
    },
    {
      "src": "^/(.*).html",
      "headers": { "cache-control": "public,max-age=0,must-revalidate" }
    }%fill%
  ]
}
`;

module.exports = {
  nowJsonTemplate
}