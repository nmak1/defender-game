export class AssetLoader {
  static async loadAll () {
    console.log('📦 Loading game assets...');

    // Здесь будет загрузка изображений, звуков и т.д.
    const assets = {
      images: {},
      sounds: {},
      fonts: {}
    };

    // Симуляция загрузки
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('✅ Assets loaded successfully');
    return assets;
  }

  static loadImage (url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  static loadSound (url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = reject;
      audio.src = url;
    });
  }
}
