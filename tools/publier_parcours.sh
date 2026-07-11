#!/bin/bash
# publier_parcours.sh — chiffre le mémo et génère la page publiée.
#
#   Source (en clair, JAMAIS committée) : _private/monParcoursV2.source.html
#   Sortie (chiffrée, committable)      : monParcoursV2.html
#
# Usage :
#   ./tools/publier_parcours.sh              # demande le mot de passe
#   ./tools/publier_parcours.sh 'MotDePasse' # mot de passe en argument
#
# Workflow : éditer la source dans _private/, relancer ce script, committer.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="_private/monParcoursV2.source.html"
OUT="monParcoursV2.html"
HEAD_TPL="tools/parcours_shell_head.html"
TAIL_TPL="tools/parcours_shell_tail.html"
ITER=310000

[ -f "$SRC" ] || { echo "❌ Source introuvable : $SRC" >&2; exit 1; }

if [ -n "${1:-}" ]; then
   PW="$1"
else
   read -rsp "Mot de passe : " PW; echo
   read -rsp "Confirmation : " PW2; echo
   [ "$PW" = "$PW2" ] || { echo "❌ Les mots de passe diffèrent." >&2; exit 1; }
fi
[ -n "$PW" ] || { echo "❌ Mot de passe vide." >&2; exit 1; }

B64=$( { printf 'OKHYPNO::'; cat "$SRC"; } \
   | openssl enc -aes-256-cbc -pbkdf2 -iter "$ITER" -md sha256 -salt -pass "pass:$PW" \
   | openssl base64 -A )

{ cat "$HEAD_TPL"; printf '%s' "$B64"; cat "$TAIL_TPL"; } > "$OUT"

echo "✅ $OUT généré ($(du -h "$OUT" | cut -f1 | tr -d ' ')) — source : $SRC"
echo "   Pense à committer $OUT (la source _private/ reste hors git)."
