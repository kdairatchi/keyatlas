# KeyAtlas — Bug Hunter API Key Reference

[![Live Page](https://img.shields.io/badge/Live-kdairatchi.github.io%2Fkeyatlas-58a6ff?style=flat-square&logo=github)](https://kdairatchi.github.io/keyatlas/)
[![Check Links](https://github.com/kdairatchi/keyatlas/actions/workflows/link-check.yml/badge.svg)](https://github.com/kdairatchi/keyatlas/actions/workflows/link-check.yml)

Every API key your bug bounty stack needs — direct dashboard links, shell snippets, config templates. Dead links checked weekly automatically.

**Live:** https://kdairatchi.github.io/keyatlas/

---

## What's included

| Category | Keys |
|----------|------|
| Hunt Platforms | HackerOne, Bugcrowd, Intigriti |
| Subdomain Recon | GitHub, Shodan, CHAOS/PD, Censys, SecurityTrails, Netlas, GitLab, BinaryEdge, LeakIX, WhoisXML |
| Threat Intel | VirusTotal, URLscan, IntelX, FOFA |
| Notifications | Discord, Telegram, Slack |
| Local Tools | Obsidian REST API, interactsh, SearXNG |

## Quick setup

```bash
# 1. Download the .env template
curl -sO https://raw.githubusercontent.com/kdairatchi/keyatlas/main/templates/.env.example

# 2. Append to your shell config and fill in keys
cat .env.example >> ~/.zshrc
# Open ~/.zshrc — replace each <YOUR_KEY> with your actual key

# 3. Reload
source ~/.zshrc

# 4. If using the Prowlr hunt stack:
cp templates/hunter.yaml.example ~/claude-bug-bounty/config/hunter.yaml
# Edit hunter.yaml — set your handles (not keys, those come from env)
```

## Priority order

Start with these — they unlock the highest coverage:

1. `GITHUB_TOKEN` — github.com/settings/tokens/new
2. `SHODAN_API_KEY` — account.shodan.io
3. `CHAOS_KEY` — cloud.projectdiscovery.io
4. `HACKERONE_API_TOKEN` — hackerone.com/settings/api_token/edit
5. `VIRUSTOTAL_API_KEY` — virustotal.com/gui/my-apikey

## Dead links

Links are verified on every push and weekly via [lychee](https://lychee.cli.rs/). If you find a broken link, [open an issue](https://github.com/kdairatchi/keyatlas/issues/new?template=dead-link.md) or submit a PR with the corrected URL.

## Roadmap

- **Phase 2** — Browser localStorage key manager (keys stay local, never sent anywhere)
- **Phase 3** — Rotation reminders + API ping validation + .env download generator
