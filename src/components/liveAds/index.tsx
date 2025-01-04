import Image from 'next/image';

export default function LiveAds() {
  return (
    <div className=" absolute top-10 right-10">
      <div className="flex gap-5 h-full bg-black/55 px-8 py-4 rounded-2xl items-center">
        <Image
          src={`/img/icon512.png`}
          alt={'Logo'}
          width={256}
          height={256}
          className="rounded-2xl w-[50px] h-[50px] rounded-r-none"
        />
        <div className="flex flex-col text-center text-xl text-white justify-center">
          <p className="font-medium text-2xl">Listen on our website</p>
          <h1 className="text-xl font-extralight">Link in the bio</h1>
        </div>
      </div>
    </div>
  );
}
