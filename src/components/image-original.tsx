import Image from "next/image";

type ImageOriginalProps = {
  src: any;
  alt: string;
};

const ImageOriginal = ({ src, alt }: ImageOriginalProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="rounded-lg object-contain w-auto h-auto"
      priority={false}
      width={1920}
      height={1080}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  );
};

export default ImageOriginal;
