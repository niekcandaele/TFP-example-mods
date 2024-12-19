const modId = 'TFP_MapIconOverrides';

const Mod = {
  about: `This mod overrides icons`,
  iconOverrides: {
    player: '/webmods/TFP_MapIconOverrides/player.png',
    animal: '/webmods/TFP_MapIconOverrides/animal.png',
    hostile: '/webmods/TFP_MapIconOverrides/hostile.png',
    animalRabbit: '/webmods/TFP_MapIconOverrides/animalRabbit.png',
    animalBear: '/webmods/TFP_MapIconOverrides/animalBear.png',
    animalChicken: '/webmods/TFP_MapIconOverrides/animalChicken.png',
    animalDeer: '/webmods/TFP_MapIconOverrides/animalDeer.png',
    animalMountainLion: '/webmods/TFP_MapIconOverrides/animalMountainLion.png',
    animalPig: '/webmods/TFP_MapIconOverrides/animalPig.png',
    animalSnake: '/webmods/TFP_MapIconOverrides/animalSnake.png',
    animalWolf: '/webmods/TFP_MapIconOverrides/animalWolf.png',
  },
};

window[modId] = Mod;
window.dispatchEvent(new Event(`mod:${modId}:ready`));
