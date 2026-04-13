import { getResponsiveImageSet } from "@/lib/image-paths";

export const stories = [
  {
    title: "The Mountains",
    author: "John Appleseed",
    date: "April 16th 2020",
    image: {
      ...getResponsiveImageSet("stories", "mountains.jpg"),
      alt: "Snow-covered mountain peak under a blue sky",
    },
  },
  {
    title: "Sunset Cityscapes",
    author: "Benjamin Cruz",
    date: "April 14th 2020",
    image: {
      ...getResponsiveImageSet("stories", "cityscapes.jpg"),
      alt: "City skyline at sunset",
    },
  },
  {
    title: "18 Days Voyage",
    author: "Alexei Borodin",
    date: "April 11th 2020",
    image: {
      ...getResponsiveImageSet("stories", "18-days-voyage.jpg"),
      alt: "Large snowy mountain landscape",
    },
  },
  {
    title: "Architecturals",
    author: "Samantha Brooke",
    date: "April 9th 2020",
    image: {
      ...getResponsiveImageSet("stories", "architecturals.jpg"),
      alt: "Curved architectural building viewed from below",
    },
  },
  {
    title: "World Tour 2019",
    author: "Timothy Wagner",
    date: "April 7th 2020",
    image: {
      ...getResponsiveImageSet("stories", "world-tour.jpg"),
      alt: "Waves at sunset",
    },
  },
  {
    title: "Unforeseen Corners",
    author: "William Wong",
    date: "April 3rd 2020",
    image: {
      ...getResponsiveImageSet("stories", "unforeseen-corners.jpg"),
      alt: "Modern curved building and sky",
    },
  },
  {
    title: "King on Africa: Part II",
    author: "Tim Hillenburg",
    date: "March 29th 2020",
    image: {
      ...getResponsiveImageSet("stories", "king-on-africa.jpg"),
      alt: "Close-up portrait of a lion",
    },
  },
  {
    title: "The Trip to Nowhere",
    author: "Felicia Rourke",
    date: "March 21st 2020",
    image: {
      ...getResponsiveImageSet("stories", "trip-to-nowhere.jpg"),
      alt: "Silhouette of a person walking at sunset",
    },
  },
  {
    title: "Rage of The Sea",
    author: "Mohammed Abdul",
    date: "March 19th 2020",
    image: {
      ...getResponsiveImageSet("stories", "rage-of-the-sea.jpg"),
      alt: "Large ocean wave in motion",
    },
  },
  {
    title: "Running Free",
    author: "Michelle",
    date: "March 16th 2020",
    image: {
      ...getResponsiveImageSet("stories", "running-free.jpg"),
      alt: "Horses running through dust",
    },
  },
  {
    title: "Behind the Waves",
    author: "Lamarr Wilson",
    date: "March 11th 2020",
    image: {
      ...getResponsiveImageSet("stories", "behind-the-waves.jpg"),
      alt: "Close-up ocean water at sunset",
    },
  },
  {
    title: "Calm Waters",
    author: "Samantha Brooke",
    date: "March 9th 2020",
    image: {
      ...getResponsiveImageSet("stories", "calm-waters.jpg"),
      alt: "Still lake with mountain reflections",
    },
  },
  {
    title: "The Milky Way",
    author: "Benjamin Cruz",
    date: "March 5th 2020",
    image: {
      ...getResponsiveImageSet("stories", "milky-way.jpg"),
      alt: "Milky Way across a starry night sky",
    },
  },
  {
    title: "Night at The Dark Forest",
    author: "  Jhonny Appleseed",
    date: "March 4th 2020",
    image: {
      ...getResponsiveImageSet("stories", "dark-forest.jpg"),
      alt: "Dark forest with mountains and moonlight",
    },
  },
  {
    title: "Somwarpet’s Beauty",
    author: "Michelle",
    date: "March 1st 2020",
    image: {
      ...getResponsiveImageSet("stories", "somwarpet.jpg"),
      alt: "Orange flowers in a field",
    },
  },
  {
    title: "Land of Dreams",
    author: "Alexei Borodin",
    date: "February 25th 2020",
    image: {
      ...getResponsiveImageSet("stories", "land-of-dreams.jpg"),
      alt: "Tree silhouetted against a dramatic sunset sky",
    },
  },
  {
    title: "Moon of Appalachia",
    author: "Karen Castillo",
    date: "February 21st 2020",
    image: {
      ...getResponsiveImageSet("stories", "moon-of-appalacia.jpg"),
      alt: "Snowy mountains under a moonlit sky",
    },
  },
];