// lib/menu-data.ts
// Central menu data — edit here to update the entire website menu

export type MenuItem = {
  id:       string
  name:     string
  desc?:    string
  price:    number
  badges?:  Array<'vegan' | 'vegetarisch'>
}

export type MenuCategory = {
  id:    string
  label: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'vorweg',
    label: 'Vorweg',
    items: [
      { id: 'v1', name: 'Erbsensuppe',            desc: 'Cremige Suppe aus feinen Erbsen, hausgemacht', price: 5.50 },
      { id: 'v2', name: 'Happen vom Hühnerfilet', desc: 'Mit Coleslaw', price: 5.50 },
      { id: 'v3', name: 'Ofenfrische Brezn',       desc: 'Mit Obazda und Kräuterfrischkäse', price: 5.00 },
    ],
  },
  {
    id: 'veg',
    label: 'Vegane & Vegetarische Schnitzel',
    items: [
      { id: 'vg1', name: 'Schwammerl-Schnitzel',   desc: 'Scheiben vom Kräuterseitling in hauseigener Panade, fein ausgebacken', price: 8.00, badges: ['vegetarisch'] },
      { id: 'vg2', name: 'Zucchinischnitzel',       desc: 'Zucchinistreifen in hausgemachter Panade, fein ausgebacken', price: 5.50, badges: ['vegetarisch'] },
      { id: 'vg3', name: 'Rösti-Schnitzel',         desc: 'Gemüse-Kartoffelrösti in hauseigener Panade, fein ausgebacken', price: 6.50, badges: ['vegetarisch'] },
      { id: 'vg4', name: 'Veganes Maisschnitzel',   desc: 'Mais-Kidneybohnen-Teig mit Limette verfeinert in hauseigener, veganer Panade', price: 7.00, badges: ['vegan'] },
      { id: 'vg5', name: 'Veganes Sellerieschnitzel', desc: 'In hauseigener, veganer Panade', price: 5.50, badges: ['vegan'] },
    ],
  },
  {
    id: 'schnitzel',
    label: 'Schnitzel',
    items: [
      { id: 's1', name: 'Schweineschnitzel',                desc: 'In hauseigener Panade, fein ausgebacken. Fleisch aus artgerechter Tierhaltung', price: 8.50 },
      { id: 's2', name: 'Bayerisches Cordon Bleu',          desc: 'Mit Original Schwarzwälder Schinken und Obazda Füllung in hauseigener Panade', price: 10.50 },
      { id: 's3', name: 'Kurkuma-Schnitzel vom Huhn',       desc: 'In knuspriger Kurkuma-Panade, fein ausgebacken', price: 10.00 },
      { id: 's4', name: 'Knusperschnitzel vom Huhn',        desc: 'Mit krossen Cornflakes paniert, fein ausgebacken', price: 10.00 },
      { id: 's5', name: 'Zitronen-Ingwer Schnitzel',        desc: 'Vom Huhn, in einer Zitronen-Ingwer Marinade, in hauseigener Panade', price: 10.50 },
      { id: 's6', name: 'Kalbsschnitzel',                   desc: 'In hauseigener Panade, fein ausgebacken. Auf Wunsch mit Preiselbeeren', price: 11.00 },
      { id: 's7', name: 'Chili-Schnitzel vom Schwein',      desc: 'Mit hauseigener Chili-Panade, fein ausgebacken', price: 9.50 },
      { id: 's8', name: 'Münchner Schnitzel',               desc: 'Vom Schwein, mit Meerrettich-Senf-Marinade und hausgemachter Panade', price: 9.00 },
      { id: 's9', name: 'Bergkäseschnitzel vom Kalb',       desc: 'Mit hauseigener Panade mit Bergkäse, fein ausgebacken', price: 12.00 },
    ],
  },
  {
    id: 'burger',
    label: 'Schnitzel-Burger',
    items: [
      { id: 'b1', name: 'Klassischer Schnitzel-Burger',       desc: 'Fleischsorte nach Wahl mit Gurke, Salat, Tomate und HeimWerk-Sauce in der Laugensemmel', price: 12.00 },
      { id: 'b2', name: 'Bergkäseschnitzel-Burger vom Kalb',  desc: 'Mit Bergkäse, Salat, Tomate, Apfelspalten und Preiselbeer-Senfsauce', price: 16.00 },
      { id: 'b3', name: 'Knusperschnitzel-Burger',             desc: 'Vom Huhn, mit Gurke, Salat, Tomate und Mango-Currysauce', price: 14.00 },
      { id: 'b4', name: 'Vegetarischer Schnitzel-Burger',      desc: 'Gemüse-Kartoffelrösti mit Kräuter-Frischkäse in der Laugensemmel', price: 11.00, badges: ['vegetarisch'] },
      { id: 'b5', name: 'Veganer Schnitzel-Burger',            desc: 'Veganes Maisschnitzel mit Basilikum-Limetten Soße in der Laugensemmel', price: 12.00, badges: ['vegan'] },
    ],
  },
  {
    id: 'freunde',
    label: '5 Freunde',
    items: [
      { id: 'f1', name: 'Erbsensuppe',           desc: 'Cremige Suppe aus feinen Erbsen, hausgemacht', price: 5.50 },
      { id: 'f2', name: 'Kalbs-Fleischpflanzerl', desc: 'Aus feinem Kalbshack, Semmeln, Kräutern und Gewürzen', price: 8.00 },
      { id: 'f3', name: 'Spinatknödel',            desc: 'Mit Spinatblättern und Bergkäse verfeinerte Semmelknödel, dazu zerlassene Butter', price: 8.50, badges: ['vegetarisch'] },
      { id: 'f4', name: 'Käsespätzle',             desc: 'Klassische Käsespätzle mit Röstzwiebeln', price: 7.50, badges: ['vegetarisch'] },
      { id: 'f5', name: 'Backhendl',               desc: 'Stücke vom Hühnerfilet in hauseigener Panade', price: 9.00 },
    ],
  },
  {
    id: 'beiwerk',
    label: 'Beiwerk',
    items: [
      { id: 'bw1', name: 'Coleslaw',                   desc: 'Salat aus Weißkohl und Karotten an Essig-Mayo Dressing', price: 5.50 },
      { id: 'bw2', name: 'Kartoffelsalat',              desc: 'Mit Schnittlauch, Radieschen, Gurken und Essig-Öl-Dressing', price: 5.00, badges: ['vegan'] },
      { id: 'bw3', name: 'Bratkartoffeln',              desc: 'Gebratene Minikartoffelspalten mit Kräutern und Zwiebeln', price: 5.50, badges: ['vegan'] },
      { id: 'bw4', name: 'Heißes Gemüse',              desc: 'Gedünstete, gebratene Zucchini und Karotten mit Kräutern', price: 5.50, badges: ['vegan'] },
      { id: 'bw5', name: 'Süßkartoffel-Pommes',        desc: 'In Pflanzenöl frittiert mit einer Sauce nach Wahl', price: 6.00, badges: ['vegan'] },
      { id: 'bw6', name: 'Pommes',                      desc: 'In Pflanzenöl frittiert mit einer Sauce nach Wahl', price: 5.00, badges: ['vegan'] },
      { id: 'bw7', name: 'Gemischter Blattsalat',       desc: 'Mit einem Dressing nach Wahl', price: 5.00, badges: ['vegan'] },
    ],
  },
  {
    id: 'saucen',
    label: 'Saucen',
    items: [
      { id: 'sa1', name: 'Ketchup',                price: 1.00, badges: ['vegan'] },
      { id: 'sa2', name: 'Mayonnaise',              price: 1.00, badges: ['vegan'] },
      { id: 'sa3', name: 'Mango-Curry-Dip',         price: 1.00, badges: ['vegan'] },
      { id: 'sa4', name: 'HeimWerk-Sauce',          price: 1.00, badges: ['vegan'] },
      { id: 'sa5', name: 'Trüffel-Mayonnaise',      price: 1.00, badges: ['vegan'] },
      { id: 'sa6', name: 'Senf',                    price: 1.00 },
      { id: 'sa7', name: 'Basilikum-Limetten-Mayo', price: 1.00 },
      { id: 'sa8', name: 'Chili-Dip',               price: 1.00, badges: ['vegan'] },
      { id: 'sa9', name: 'Kräuter-Frischkäse-Dip', price: 1.00 },
      { id: 'sa10', name: 'Preiselbeeren',          price: 1.00 },
    ],
  },
]
