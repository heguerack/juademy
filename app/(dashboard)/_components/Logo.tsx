import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      height={100}
      width={100}
      src={'/logos/logo-no-background.png'}
      alt='logo'
    />
  )
}
