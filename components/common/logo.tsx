import Image from 'next/image'

const Logo = ({ className }: { className?: string}) => {
  return (
    <Image
        src="/logo.jpeg"
        alt="Logo"
        width={100}
        height={50}
        className={`object-contain ${className}`}
    />
  )
}

export default Logo
