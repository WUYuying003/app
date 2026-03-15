#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install dependencies based on what's present in the project
cd "${CLAUDE_PROJECT_DIR:-.}"

# Node.js
if [ -f "package.json" ]; then
  echo "Installing Node.js dependencies..."
  npm install
fi

# Python (pip)
if [ -f "requirements.txt" ]; then
  echo "Installing Python dependencies (pip)..."
  pip install -r requirements.txt
fi

# Python (Poetry)
if [ -f "pyproject.toml" ] && command -v poetry &>/dev/null; then
  echo "Installing Python dependencies (poetry)..."
  poetry install
fi

# Ruby
if [ -f "Gemfile" ]; then
  echo "Installing Ruby dependencies..."
  bundle install
fi

# Go
if [ -f "go.mod" ]; then
  echo "Downloading Go modules..."
  go mod download
fi

# Rust
if [ -f "Cargo.toml" ]; then
  echo "Building Rust dependencies..."
  cargo fetch
fi

echo "Session start hook completed."
