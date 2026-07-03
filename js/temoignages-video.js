/* Témoignages vidéo — mots-clés animés synchronisés [secondes, "texte"].
   Le texte est éditable ici, pas incrusté dans la vidéo. Timings approximatifs. */
const KEYWORDS = {
  jaune:    [[0.5,"6 ans sous morphine"],[6,"J'ai essayé l'hypnose"],[11,"Ça a très bien marché"],[17,"J'ai pu tout arrêter"],[24,"Fini la morphine"],[31,"Je vais beaucoup mieux"],[40,"Très réceptive"]],
  blanc:    [[1,"Une hypnose pour mes douleurs"],[6,"Trois séances"],[11,"C'est extraordinaire"],[17,"Ne plus avoir mal"],[24,"La fibromyalgie a reculé"],[31,"Une vraie différence"]],
  stomato:  [[2,"La langue brûlante"],[8,"Des picotements"],[14,"Jour et nuit"],[22,"Trois mois d'enfer"],[29,"Aucune cause organique"],[35,"Un soin en hypnose"],[44,"Comme des couteaux"],[58,"Puis l'apaisement"],[72,"De 9 à 2"],[90,"Un vrai espoir"],[103,"Merci Olivier"]],
  sucre:    [[2,"Mon problème de sucre"],[7,"Une séance d'hypnose"],[11,"Un véritable succès"],[19,"Après mon bypass"],[31,"Le sucre interdit"],[44,"Des moments difficiles"],[58,"L'envie revenait"],[75,"Hors de contrôle"],[95,"Puis le déclic"],[120,"Maître de mon soin"],[138,"Au fond des choses"],[148,"Comprendre le pourquoi"]],
  anamnese: [[1,"L'anamnèse"],[4,"Le cœur du travail"],[8,"Derrière le symptôme"],[13,"Pas juste le sucre"],[18,"Ce qui se cache"],[22,"Tout change"]],
  seance:   [[2,"S'adapter à la personne"],[9,"Diminuer la souffrance"],[17,"Pas de script tout fait"],[26,"Une séance sur-mesure"],[40,"À l'écoute du ressenti"],[55,"Le bon levier"],[70,"Une seule séance"],[80,"Des années réglées"],[88,"C'est incroyable"]]
};

document.querySelectorAll('.vt-video[data-id]').forEach(box => {
  const cues = (KEYWORDS[box.dataset.id] || []).slice().sort((a, b) => a[0] - b[0]);
  const el = box.querySelector('.vt-kw .kw');
  let cur = -1;
  function update(t) {
    let i = -1;
    for (let k = 0; k < cues.length; k++) { if (t >= cues[k][0]) i = k; else break; }
    if (i !== cur) {
      cur = i;
      el.classList.remove('show');
      if (i >= 0) {
        setTimeout(() => { el.textContent = cues[i][1]; el.classList.add('show'); }, 55);
      }
    }
  }
  box.querySelectorAll('video').forEach(v => {
    v.addEventListener('timeupdate', () => update(v.currentTime));
    v.addEventListener('seeking', () => update(v.currentTime));
    v.addEventListener('play', () => { cur = -1; update(v.currentTime); });
  });
});
