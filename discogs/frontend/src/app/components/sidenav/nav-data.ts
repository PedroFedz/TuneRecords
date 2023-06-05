
import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [

{
   routeLink: 'home',
   icon: 'home.png',
   label: 'Home'
 },
 {
  routeLink: 'products',
  icon: '',
  label: 'Products'
},
{
  routeLink: 'artists',
  icon: 'fal fa-tag',
  label: 'Artists',
  items: [
    {
      routeLink: 'artists/feid',
      label: 'Feid'
    },
    {
      routeLink: 'artists/CruzCafuné',
      label: 'Cruz Cafuné'
    },
    {
      routeLink: 'artists/Sade',
      label: 'Sade'
    },
    {
      routeLink: 'artists/The Beatles',
      label: 'The Beatles'
    },
    {
      routeLink: 'artists/David Bisbal',
      label: 'David Bisbal'
    },
  ]
}
];
