/**
 * Modeli kuća — PLACEHOLDER sadržaj (nazivi, kvadrature, opisi i slike se menjaju).
 * `packageId` povezuje model sa paketom iz ./packages.ts (odatle se računa okvirna cena).
 */
import type { PackagePlan } from './packages'

export interface HouseModel {
  id: string
  name: string
  tagline: string
  description: string
  packageId: PackagePlan['id']
  area: number
  bedrooms: number
  bathrooms: number
  floors: string
  terrace: string
  images: string[]
  features: string[]
}

export const houseModels: HouseModel[] = [
  {
    id: 'javor',
    name: 'Javor',
    tagline: 'Vikendica sa galerijom za spavanje',
    description:
      'Kompaktna kućica sa visokim plafonom i galerijom iznad dnevnog boravka. Velika staklena površina na zabatu uvodi prirodu unutra, a natkrivena terasa produžava boravak napolje.',
    packageId: 'vikendica',
    area: 36,
    bedrooms: 1,
    bathrooms: 1,
    floors: 'Prizemlje + galerija',
    terrace: '12 m²',
    images: [
      '/brvnara_photo/Photo_1.jpg',
      '/brvnara_photo/Photo_2.jpg',
      '/brvnara_photo/Ent_1.jpg',
      '/brvnara_photo/Ent_2.jpg',
    ],
    features: [
      'Galerija za spavanje',
      'Natkrivena terasa',
      'Kuhinjski blok',
      'Kupatilo sa tušem',
      'Peć na drva',
      'Staklo na zabatu',
    ],
  },
  {
    id: 'smreka',
    name: 'Smreka',
    tagline: 'Studio za dvoje ili gostinska kućica',
    description:
      'Najmanji model u ponudi — jedan otvoren prostor sa kuhinjom, ležajem i kupatilom. Idealan za glamping, izdavanje ili kao gostinska kućica u dvorištu.',
    packageId: 'vikendica',
    area: 24,
    bedrooms: 1,
    bathrooms: 1,
    floors: 'Prizemlje',
    terrace: '8 m²',
    images: [
      '/brvnara_photo/Photo_7.jpg',
      '/brvnara_photo/Ent_9.jpg',
      '/brvnara_photo/Ent_01.jpg',
      '/brvnara_photo/Ent_02.jpg',
    ],
    features: [
      'Otvoren plan',
      'Mini kuhinja',
      'Kupatilo sa tušem',
      'Klima uređaj',
      'Ulazna terasa',
      'Brza montaža',
    ],
  },
  {
    id: 'bor',
    name: 'Bor',
    tagline: 'Porodična brvnara sa potkrovljem',
    description:
      'Klasičan oblik sa dvovodnim krovom: dole dnevni boravak, kuhinja i kupatilo, gore dve spavaće sobe u potkrovlju. Najtraženiji raspored za četvoročlanu porodicu.',
    packageId: 'porodicna',
    area: 68,
    bedrooms: 2,
    bathrooms: 1,
    floors: 'Prizemlje + potkrovlje',
    terrace: '16 m²',
    images: [
      '/brvnara_photo/Photo_3.jpg',
      '/3dmodels/3dmodel1.jpg',
      '/brvnara_photo/Ent_3.jpg',
      '/brvnara_photo/Ent_4.jpg',
    ],
    features: [
      'Dve spavaće sobe',
      'Opremljena kuhinja',
      'Trpezarija uz staklo',
      'Ostava',
      'Peć na pelet',
      'Terasa sa ogradom',
    ],
  },
  {
    id: 'hrast',
    name: 'Hrast',
    tagline: 'Spratna kuća za celogodišnji život',
    description:
      'Pun sprat umesto potkrovlja daje prave, visoke sobe i dva kupatila. Dnevna zona je otvorena prema terasi, a spavaća zona je odvojena i tiha.',
    packageId: 'porodicna',
    area: 92,
    bedrooms: 3,
    bathrooms: 2,
    floors: 'Prizemlje + sprat',
    terrace: '20 m²',
    images: [
      '/brvnara_photo/Photo_4.jpg',
      '/3dmodels/3dmodels1.jpg',
      '/brvnara_photo/Ent_5.jpg',
      '/brvnara_photo/Ent_6.jpg',
    ],
    features: [
      'Tri spavaće sobe',
      'Dva kupatila',
      'Kotlarnica',
      'Garderober',
      'Podno grejanje u kupatilima',
      'Balkon na spratu',
    ],
  },
  {
    id: 'jela',
    name: 'Jela',
    tagline: 'Premium kuća sa staklenom fasadom',
    description:
      'Lepljena lamela omogućava staklena platna od poda do krova i dnevni boravak bez ijednog stuba. Kuća se predaje potpuno opremljena, sa pametnim sistemom i nameštajem po meri.',
    packageId: 'premium',
    area: 128,
    bedrooms: 3,
    bathrooms: 2,
    floors: 'Prizemlje + galerija',
    terrace: '32 m²',
    images: [
      '/brvnara_photo/Photo_5.jpg',
      '/3dmodels/3dmodel3.jpg',
      '/brvnara_photo/Ent_7.jpg',
      '/brvnara_photo/Ent_8.jpg',
    ],
    features: [
      'Staklena fasada',
      'Kamin',
      'Pametna kuća',
      'Podno grejanje',
      'Master soba sa kupatilom',
      'Nameštaj po meri',
    ],
  },
  {
    id: 'planinka',
    name: 'Planinka',
    tagline: 'Velika planinska kuća sa saunom',
    description:
      'Reprezentativna kuća za veliku porodicu ili butik smeštaj. Četiri spavaće sobe, wellness kutak sa saunom i prostrana terasa sa pogledom — sve u toplom drvetu.',
    packageId: 'premium',
    area: 150,
    bedrooms: 4,
    bathrooms: 3,
    floors: 'Prizemlje + sprat',
    terrace: '40 m²',
    images: [
      '/brvnara_photo/Photo_8.jpg',
      '/3dmodels/3dmodel4.jpg',
      '/brvnara_photo/Ent_10.jpg',
      '/brvnara_photo/Ent_03.jpg',
    ],
    features: [
      'Sauna',
      'Četiri spavaće sobe',
      'Tri kupatila',
      'Toplotna pumpa',
      'Garaža / nadstrešnica',
      'Terasa sa pogledom',
    ],
  },
]
