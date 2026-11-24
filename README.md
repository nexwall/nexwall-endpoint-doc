# Nexwall Endpoint documentation

Public design and technology documentation of Nexwall Endpoint (endpoint detection and response, working together with
Nexwall Firewall). Built with Docusaurus; the content is in `docs/design/` (one tab, "Endpoint design", with diagrams in Mermaid).

Status: the product is in development. Everything described as a target is a goal, not a measurement. Progress is tracked in
https://github.com/nexwall/nexwall-endpoint-releasenotes.

```
yarn install    # Node 20 or newer
yarn start      # local preview
yarn build
```

Every push to `main` builds the site and publishes it to the `gh-pages` branch (`.github/workflows/deploy.yml`).
Set Settings > Pages > Source = "Deploy from a branch: gh-pages" and choose the domain when ready.

## License

Documentation licensed under CC BY-NC 4.0, see `LICENSE`.
