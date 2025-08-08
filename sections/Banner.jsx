import Image from 'next/image';

export default function Banner({ type = 'image', src, alt = 'Bannière', children }) {
  return (
    <div className="banner">
      {type === 'image' ? (
        <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
      ) : (
        <video
          src={src}
          className="banner-media"
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <div className="banner_overlay" />
      <div className="banner_content">{children}</div>
    </div>
  );
}
