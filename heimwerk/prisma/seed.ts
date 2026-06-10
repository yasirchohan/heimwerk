import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
  const kategorien = [
    { name: 'Vorweg', slug: 'vorweg', reihenfolge: 1 },
    { name: 'Vegane & Vegetarische Schnitzel', slug: 'vegane-vegetarische', reihenfolge: 2 },
    { name: 'Schnitzel', slug: 'schnitzel', reihenfolge: 3 },
    { name: 'Schnitzel-Burger', slug: 'schnitzel-burger', reihenfolge: 4 },
    { name: '5 Freunde', slug: 'fuenf-freunde', reihenfolge: 5 },
    { name: 'Beiwerk', slug: 'beiwerk', reihenfolge: 6 },
    { name: 'Saucen', slug: 'saucen', reihenfolge: 7 },
  ]

  for (const kat of kategorien) {
    await prisma.menuKategorie.upsert({
      where: { slug: kat.slug },
      update: {},
      create: kat,
    })
  }

  const vorwegKat = await prisma.menuKategorie.findUnique({ where: { slug: 'vorweg' } })
  const vegKat = await prisma.menuKategorie.findUnique({ where: { slug: 'vegane-vegetarische' } })
  const schnKat = await prisma.menuKategorie.findUnique({ where: { slug: 'schnitzel' } })
  const burgKat = await prisma.menuKategorie.findUnique({ where: { slug: 'schnitzel-burger' } })
  const frKat = await prisma.menuKategorie.findUnique({ where: { slug: 'fuenf-freunde' } })
  const beiKat = await prisma.menuKategorie.findUnique({ where: { slug: 'beiwerk' } })
  const sauKat = await prisma.menuKategorie.findUnique({ where: { slug: 'saucen' } })

  const gerichte = [
    // Vorweg
    { name: 'Erbsensuppe', beschreibung: 'Cremige Suppe aus feinen Erbsen, hausgemacht', preis: 5.50, kategorieId: vorwegKat!.id },
    { name: 'Happen vom Hühnerfilet', beschreibung: 'Mit Coleslaw', preis: 5.50, kategorieId: vorwegKat!.id },
    { name: 'Ofenfrische Brezn', beschreibung: 'Mit Obazda und Kräuterfrischkäse', preis: 5.00, kategorieId: vorwegKat!.id },
    // Vegane & Vegetarische
    { name: 'Schwammerl-Schnitzel', beschreibung: 'Scheiben vom Kräuterseitling in hauseigener Panade, fein ausgebacken', preis: 8.00, vegetarisch: true, kategorieId: vegKat!.id },
    { name: 'Zucchinischnitzel', beschreibung: 'Zucchinistreifen in hausgemachter Panade, fein ausgebacken', preis: 5.50, vegetarisch: true, kategorieId: vegKat!.id },
    { name: 'Rösti-Schnitzel', beschreibung: 'Gemüse-Kartoffelrösti in hauseigener Panade, fein ausgebacken', preis: 6.50, vegetarisch: true, kategorieId: vegKat!.id },
    { name: 'Veganes Maisschnitzel', beschreibung: 'Mais-Kidneybohnen-Teig mit Limette verfeinert in hauseigener, veganer Panade', preis: 7.00, vegan: true, kategorieId: vegKat!.id },
    { name: 'Veganes Sellerieschnitzel', beschreibung: 'In hauseigener, veganer Panade', preis: 5.50, vegan: true, kategorieId: vegKat!.id },
    // Schnitzel
    { name: 'Schweineschnitzel', beschreibung: 'In hauseigener Panade, fein ausgebacken. Fleisch aus artgerechter Tierhaltung', preis: 8.50, kategorieId: schnKat!.id },
    { name: 'Bayerisches Cordon Bleu', beschreibung: 'Mit Original Schwarzwälder Schinken und Obazda Füllung in hauseigener Panade', preis: 10.50, highlight: true, kategorieId: schnKat!.id },
    { name: 'Kurkuma-Schnitzel vom Huhn', beschreibung: 'In knuspriger Kurkuma-Panade, fein ausgebacken', preis: 10.00, kategorieId: schnKat!.id },
    { name: 'Knusperschnitzel vom Huhn', beschreibung: 'Mit krossen Cornflakes paniert, fein ausgebacken', preis: 10.00, kategorieId: schnKat!.id },
    { name: 'Zitronen-Ingwer Schnitzel', beschreibung: 'Vom Huhn, in einer Zitronen-Ingwer Marinade, in hauseigener Panade', preis: 10.50, kategorieId: schnKat!.id },
    { name: 'Kalbsschnitzel', beschreibung: 'In hauseigener Panade, fein ausgebacken. Auf Wunsch mit Preiselbeeren', preis: 11.00, highlight: true, kategorieId: schnKat!.id },
    { name: 'Chili-Schnitzel vom Schwein', beschreibung: 'Mit hauseigener Chili-Panade, fein ausgebacken', preis: 9.50, kategorieId: schnKat!.id },
    { name: 'Münchner Schnitzel', beschreibung: 'Vom Schwein, mit Meerrettich-Senf-Marinade und hausgemachter Panade', preis: 9.00, kategorieId: schnKat!.id },
    { name: 'Bergkäseschnitzel vom Kalb', beschreibung: 'Mit hauseigener Panade mit Bergkäse, fein ausgebacken', preis: 12.00, highlight: true, kategorieId: schnKat!.id },
    // Burger
    { name: 'Klassischer Schnitzel-Burger', beschreibung: 'Fleischsorte nach Wahl in hauseigener Panade mit Gurke, Salat, Tomate und HeimWerk-Sauce', preis: 12.00, kategorieId: burgKat!.id },
    { name: 'Bergkäseschnitzel-Burger', beschreibung: 'Vom Kalb, in hauseigener Panade mit Bergkäse, Apfelspalten und Preiselbeer-Senfsauce', preis: 16.00, highlight: true, kategorieId: burgKat!.id },
    { name: 'Knusperschnitzel-Burger', beschreibung: 'Vom Huhn, mit Mango-Currysauce in der Laugensemmel', preis: 14.00, kategorieId: burgKat!.id },
    { name: 'Vegetarischer Schnitzel-Burger', beschreibung: 'Gemüse-Kartoffelrösti mit Kräuter-Frischkäse in der Laugensemmel', preis: 11.00, vegetarisch: true, kategorieId: burgKat!.id },
    { name: 'Veganer Schnitzel-Burger', beschreibung: 'Veganes Maisschnitzel mit Basilikum-Limetten Soße in der Laugensemmel', preis: 12.00, vegan: true, kategorieId: burgKat!.id },
    // 5 Freunde
    { name: 'Kalbs-Fleischpflanzerl', beschreibung: 'Aus feinem Kalbshack, Semmeln, Kräutern und Gewürzen', preis: 8.00, kategorieId: frKat!.id },
    { name: 'Spinatknödel', beschreibung: 'Mit Spinatblättern und Bergkäse verfeinerte Semmelknödel, dazu zerlassene Butter', preis: 8.50, vegetarisch: true, kategorieId: frKat!.id },
    { name: 'Käsespätzle', beschreibung: 'Klassische Käsespätzle mit Röstzwiebeln', preis: 7.50, vegetarisch: true, kategorieId: frKat!.id },
    { name: 'Backhendl', beschreibung: 'Stücke vom Hühnerfilet in hauseigener Panade', preis: 9.00, kategorieId: frKat!.id },
    // Beiwerk
    { name: 'Coleslaw', beschreibung: 'Salat aus Weißkohl und Karotten an Essig-Mayo Dressing', preis: 5.50, kategorieId: beiKat!.id },
    { name: 'Kartoffelsalat', beschreibung: 'Mit Schnittlauch, Radieschen, Gurken und Essig-Öl-Dressing', preis: 5.00, vegan: true, kategorieId: beiKat!.id },
    { name: 'Bratkartoffeln', beschreibung: 'Gebratene Minikartoffelspalten mit Kräutern und Zwiebeln', preis: 5.50, vegan: true, kategorieId: beiKat!.id },
    { name: 'Süßkartoffel-Pommes', beschreibung: 'In Pflanzenöl frittiert mit einer Sauce nach Wahl', preis: 6.00, vegan: true, kategorieId: beiKat!.id },
    { name: 'Pommes', beschreibung: 'In Pflanzenöl frittiert mit einer Sauce nach Wahl', preis: 5.00, vegan: true, kategorieId: beiKat!.id },
    // Saucen
    { name: 'HeimWerk-Sauce', preis: 1.00, vegan: true, kategorieId: sauKat!.id },
    { name: 'Trüffel-Mayonnaise', preis: 1.00, vegan: true, kategorieId: sauKat!.id },
    { name: 'Mango-Curry-Dip', preis: 1.00, vegan: true, kategorieId: sauKat!.id },
    { name: 'Ketchup', preis: 1.00, vegan: true, kategorieId: sauKat!.id },
    { name: 'Preiselbeeren', preis: 1.00, kategorieId: sauKat!.id },
  ]

  for (const g of gerichte) {
    await prisma.gericht.create({ data: g })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
