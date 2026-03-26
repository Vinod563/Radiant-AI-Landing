export default function CIO100Logo({ className = '', width = 140, height = 50 }) {
  return (
    <img
      src="/cio-100-awards.png"
      alt="CIO 100 Awards"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
