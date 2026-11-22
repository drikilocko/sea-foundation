// Emblème SEA gris, fixé au bord droit de l'écran. Chaque section à fond clair en contient
// une fenêtre : comme l'image est en position fixe, les sections claires qui se suivent
// affichent un seul et même logo, immobile pendant le défilement.
export default function LogoWatermark() {
  return (
    <div className="logo-watermark" aria-hidden="true">
      <div className="logo-watermark__img" />
    </div>
  );
}
