// /src/components/MenuSection.tsx
import Image from 'next/image';

const menuImages: string[] = [
  'https://i.postimg.cc/bNT22m7C/file-000000006ac461f98a58a424deaf2c7e-1.png',
  'https://i.postimg.cc/X7Qpvp5t/file-000000007de861f9ad0f420fd4bb4afc.png',
  'https://i.postimg.cc/XqnYjbYV/file-000000004d2061f98e8cf2d447dc6910.png',
  'https://i.postimg.cc/wTfjpn8p/file-00000000b03861f99d0c4277ed32f0a8.png',
];

const MenuSection = () => {
  return (
    <section id="menu" className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Menu</h2>

        <div className="overflow-x-auto">
          <div className="flex gap-6 flex-nowrap pb-4">
            {menuImages.map((src, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={src}
                  alt={`Menu item ${index + 1}`}
                  width={300}
                  height={400}
                  loading="lazy"
                  className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
