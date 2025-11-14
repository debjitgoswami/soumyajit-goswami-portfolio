// ---------------------------
// projectMedia.js
// Data storage only - no DOM manipulation
// ---------------------------

const projects = {
  1: {
    title: "Cheetah",
    category: "Character Design",
    images: [
      "../images/Renders/Cheetah/cheetah-img.jpg",
      "../images/Renders/Cheetah/cheetah-img2.jpg",
      "../images/Renders/Cheetah/cheetah-img4.jpg",
    ],
    video: [
      "../images/Renders/Cheetah/Cheetah-vid.mp4",
      "../images/Renders/Cheetah/Female_Cheetah2.mp4",
      "../images/Renders/Cheetah/Male_Cheetah1.mp4",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "xGen",
      "Arnold Renderer",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Cheetah/cheetah-img.jpg",
  },
  2: {
    title: "Modern Indian Warrior",
    category: "Character Design",
    images: [
      "../images/Renders/Army/Army_Albedo.jpg",
      "../images/Renders/Army/Army_FullQuality.jpg",
      "../images/Renders/Army/Army_Grey.jpg",
      "../images/Renders/Army/Army_normal.jpg",
      "../images/Renders/Army/Army_portrait1.jpg",
      "../images/Renders/Army/Army_roughness.jpg",
      "../images/Renders/Army/Army_wireframe.jpg",
    ],
    video: [
      "../images/Renders/Army/Army_turntable001_FullQuality_1.mp4",
      "../images/Renders/Army/Army_turntable001_FullQuality_2.mp4",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "xGen",
      "Marmoset Toolbag",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Army/Army_portrait1.jpg",
  },
  3: {
    title: "Bull",
    category: "Character Design",
    images: [
      "../images/Renders/Bull/soumyajit-aaraark-studio-basecolor.jpg",
      "../images/Renders/Bull/soumyajit-aaraark-studio-roughness.jpg",
      "../images/Renders/Bull/soumyajit-aaraark-studio-normal.jpg",
      "../images/Renders/Bull/soumyajit-aaraark-studio-roughness.jpg",
      "../images/Renders/Bull/soumyajit-full-body.jpg",
      "../images/Renders/Bull/soumyajit-axe.jpg",
      "../images/Renders/Bull/soumyajit-face-focus.jpg",
    ],
    video: [
      "../images/Renders/Bull/clip-01.mp4",
      "../images/Renders/Bull/clip-03.mp4",
      "../images/Renders/Bull/clip-04.mp4",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "Marmoset Toolbag",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Bull/soumyajit-full-body.jpg",
  },

  4: {
    title: "Dragon",
    category: "Character Design",
    images: [
      "../images/Renders/Dragon/soumyajit-d1.jpg",
      "../images/Renders/Dragon/soumyajit-d1.jpg",
      "../images/Renders/Dragon/soumyajit-d2.jpg",
      "../images/Renders/Dragon/soumyajit-z1.jpg",
      "../images/Renders/Dragon/soumyajit-z3.jpg",
      "../images/Renders/Dragon/soumyajit-z4.jpg",
      "../images/Renders/Dragon/soumyajit-z5.jpg",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "Marmoset Toolbag",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Dragon/soumyajit-d1.jpg",
  },
  5: {
    title: "Scholar",
    category: "Character Design",
    images: [
      "../images/Renders/Scholar/soumyajit-bookfinal.jpg",
      "../images/Renders/Scholar/soumyajit-facesculpting.jpg",
      "../images/Renders/Scholar/soumyajit-final-composite1final.jpg",
      "../images/Renders/Scholar/soumyajit-final-composite2final.jpg",
      "../images/Renders/Scholar/soumyajit-sculpting.jpg",
    ],
    video: [
      "../images/Renders/Scholar/facereveal.mp4",
      "../images/Renders/Scholar/scholarallmaps.mp4",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "Marmoset Toolbag",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Scholar/soumyajit-final-composite2final.jpg",
  },

  6: {
    title: "Character 8",
    category: "Character Design",
    thumbnail: "../images/Renders/Character8/All3.jpg",

    subprojects: [
      {
        key: "farkas",
        title: "Farkas",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Farkas/f3.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Farkas/f1.jpg",
          "../images/Renders/Character8/Farkas/f2.jpg",
          "../images/Renders/Character8/Farkas/f3.jpg",
          "../images/Renders/Character8/Farkas/z1.jpg",
          "../images/Renders/Character8/Farkas/z2.jpg",
          "../images/Renders/Character8/Farkas/z3.jpg",
          "../images/Renders/Character8/Farkas/z4.jpg",
        ],
        video: ["../images/Renders/Character8/Farkas/Farkas_vid.mp4"],
      },

      {
        key: "lily",
        title: "Lily",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Lily/Lily001.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Lily/Lily001.jpg",
          "../images/Renders/Character8/Lily/Lily002.jpg",
          "../images/Renders/Character8/Lily/Lily.jpg",
          "../images/Renders/Character8/Lily/z1.jpg",
          "../images/Renders/Character8/Lily/z2.jpg",
          "../images/Renders/Character8/Lily/z3.jpg",
          "../images/Renders/Character8/Lily/z4.jpg",
        ],
        video: ["../images/Renders/Character8/Lily/lily_vid.mp4"],
      },

      {
        key: "medve",
        title: "Medve",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Medve/c1.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Medve/c1.jpg",
          "../images/Renders/Character8/Medve/c2.jpg",
          "../images/Renders/Character8/Medve/c3.jpg",
          "../images/Renders/Character8/Medve/z1.jpg",
          "../images/Renders/Character8/Medve/z2.jpg",
          "../images/Renders/Character8/Medve/z3.jpg",
          "../images/Renders/Character8/Medve/z4.jpg",
        ],
        video: ["../images/Renders/Character8/Medve/Medve_vid.mp4"],
      },

      {
        key: "reindeer",
        title: "Reindeer",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Reindeer/f1.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Reindeer/f1.jpg",
          "../images/Renders/Character8/Reindeer/f2.jpg",
          "../images/Renders/Character8/Reindeer/f3.jpg",
          "../images/Renders/Character8/Reindeer/z1.jpg",
          "../images/Renders/Character8/Reindeer/z2.jpg",
          "../images/Renders/Character8/Reindeer/z3.jpg",
          "../images/Renders/Character8/Reindeer/z4.jpg",
        ],
        video: ["../images/Renders/Character8/Reindeer/Reindeer_vid.mp4"],
      },

      {
        key: "simon",
        title: "Simon",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Simon/Simon.png",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Simon/Simon.png",
          "../images/Renders/Character8/Simon/Simon001.png",
          "../images/Renders/Character8/Simon/Simon002.png",
        ],
        video: ["../images/Renders/Character8/Simon/Simon_vid.mp4"],
      },

      {
        key: "vicky",
        title: "Vicky",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Vicky/Vicky001.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Vicky/Vicky.jpg",
          "../images/Renders/Character8/Vicky/Vicky001.jpg",
          "../images/Renders/Character8/Vicky/Vicky002.jpg",
          "../images/Renders/Character8/Vicky/z1.jpg",
          "../images/Renders/Character8/Vicky/z2.jpg",
          "../images/Renders/Character8/Vicky/z3.jpg",
          "../images/Renders/Character8/Vicky/z4.jpg",
        ],
        video: ["../images/Renders/Character8/Vicky/Vicky_vid.mp4"],
      },

      {
        key: "will",
        title: "Will",
        category: "Character Subproject",
        thumbnail: "../images/Renders/Character8/Will/z1.jpg",
        tech: ["Zbrush", "Substance Painter", "Maya"],
        images: [
          "../images/Renders/Character8/Will/z1.jpg",
          "../images/Renders/Character8/Will/z2.jpg",
          "../images/Renders/Character8/Will/z3.jpg",
          "../images/Renders/Character8/Will/z4.jpg",
        ],
        // video: ["../images/Renders/Character8/Will/Will_vid.mp4"],
      },
    ],
  },

  7: {
    title: "Robot",
    category: "Character Design",
    images: [
      "../images/Renders/Robot/soumyajit-db.jpg",
      "../images/Renders/Robot/soumyajit-db1.jpg",
      "../images/Renders/Robot/soumyajit-db2.jpg",
      "../images/Renders/Robot/soumyajit-dinobotbasecolor.jpg",
      "../images/Renders/Robot/soumyajit-dinobotwireframe.jpg",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "Marmoset Toolbag",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Robot/soumyajit-db.jpg",
  },

  8: {
    title: "Angle",
    category: "Character Design",
    images: [
      "../images/Renders/Angle/soumyajit-2.jpg",
      "../images/Renders/Angle/soumyajit-3.jpg",
      "../images/Renders/Angle/soumyajit-4.jpg",
    ],
    tech: ["ZBrush"],
    thumbnail: "../images/Renders/Angle/soumyajit-2.jpg",
  },

  9: {
    title: "Environmental Design",
    category: "Environmental Design",
    images: [
      "../images/Renders/Bg/soumyajit-abandoned-house.jpg",
      "../images/Renders/Bg/soumyajit-day1.jpg",
      "../images/Renders/Bg/soumyajit-night-bg1.jpg",
      "../images/Renders/Bg/soumyajit-daywireframe.jpeg",
    ],
    tech: [
      "Zbrush",
      "Substance Painter",
      "Maya",
      "Arnold Renderer",
      "Photoshop",
    ],
    thumbnail: "../images/Renders/Bg/soumyajit-abandoned-house.jpg",
  },
  10: {
    title: "Krang",
    category: "Character Design",
    images: [
      "../images/Renders/Krang/soumyajit-31.jpg",
      "../images/Renders/Krang/soumyajit-33.jpg",
      "../images/Renders/Krang/soumyajit-34.jpg",
      "../images/Renders/Krang/soumyajit-35.jpg",
      "../images/Renders/Krang/soumyajit-36.jpg",
    ],
    tech: ["ZBrush"],
    thumbnail: "../images/Renders/Krang/soumyajit-31.jpg",
  },

  11: {
    title: "Orc",
    category: "Character Design",
    images: [
      "../images/Renders/Orc/soumyajit-20.jpg",
      "../images/Renders/Orc/soumyajit-21.jpg",
      "../images/Renders/Orc/soumyajit-22.jpg",
      "../images/Renders/Orc/soumyajit-23.jpg",
    ],
    video: ["../images/Renders/Orc/ork-002.mp4"],
    tech: ["ZBrush", "Marmoset Toolbag", "Photoshop"],
    thumbnail: "../images/Renders/Orc/soumyajit-thumb.jpg",
  },

  12: {
    title: "Paintings",
    category: "Illustration",
    images: [
      "../images/Renders/Paintings/soumyajit-img-1.jpg",
      "../images/Renders/Paintings/soumyajit-img-2.jpg",
      "../images/Renders/Paintings/soumyajit-img-3.jpg",
      "../images/Renders/Paintings/soumyajit-img-4.jpg",
      "../images/Renders/Paintings/soumyajit-img-5.jpg",
      "../images/Renders/Paintings/soumyajit-img-6.jpg",
      "../images/Renders/Paintings/soumyajit-img-7.jpg",
      "../images/Renders/Paintings/soumyajit-img-8.jpeg",
      "../images/Renders/Paintings/soumyajit-img-9.jpeg",
      "../images/Renders/Paintings/soumyajit-img-10.jpeg",
    ],

    tech: ["Traditional Painting"],
    thumbnail: "../images/Renders/Paintings/soumyajit-img-10.jpeg",
  },

  13: {
    title: "Sketches",
    category: "Illustration",
    images: [
      "../images/Renders/Sketches/soumyajit-img-1.jpg",
      "../images/Renders/Sketches/soumyajit-img-2.jpg",
      "../images/Renders/Sketches/soumyajit-img-3.jpg",
      "../images/Renders/Sketches/soumyajit-img-4.jpg",
      "../images/Renders/Sketches/soumyajit-img-5.jpg",
      "../images/Renders/Sketches/soumyajit-img-6.jpg",
      "../images/Renders/Sketches/soumyajit-img-7.jpg",
      "../images/Renders/Sketches/soumyajit-img-8.jpg",
      "../images/Renders/Sketches/soumyajit-img-9.jpg",
      "../images/Renders/Sketches/soumyajit-img-10.jpg",
    ],

    tech: ["Traditional Sketch"],
    thumbnail: "../images/Renders/Sketches/soumyajit-img-thum.jpg",
  },
};
