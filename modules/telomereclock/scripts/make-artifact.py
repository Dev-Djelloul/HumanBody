"""Transforme dist/index.html (document complet) en fragment pour la publication Artifact :
titre, polices, styles, racine et script, sans <html>, <head> ni <body>."""
import re, sys
s = open('dist/index.html', encoding='utf-8').read()
title = re.search(r'<title>.*?</title>', s, re.S).group(0)
links = re.findall(r'<link rel="(?:preconnect|stylesheet)"[^>]*>', s)
styles = re.findall(r'<style[^>]*>.*?</style>', s, re.S)
scripts = re.findall(r'<script type="module"[^>]*>.*?</script>', s, re.S)
assert styles and scripts and len(scripts) == 1, (len(styles), len(scripts))
out = '\n'.join([title, *links, *styles, '<div id="root"></div>', *scripts]) + '\n'
open('dist/artifact.html', 'w', encoding='utf-8').write(out)
# Fichier de test : le même fragment dans un squelette minimal
open('dist/artifact-test.html', 'w', encoding='utf-8').write(
  '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' + out + '</body></html>')
print('artifact.html', len(out) // 1024, 'Ko')
