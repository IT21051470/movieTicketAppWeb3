import Image from '../asset/heroimage.jpg'

const Banner = () => {
  return (
    <div
      style={{ backgroundImage: 'url(' + Image + ')' }}
      className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mb-4 flex flex-col"
    >
      <div className="text-white p-8 space-y-8">
        <div className="space-y-2">
        <h3 className="text-3xl font-bold text-dark">OPPENHEIMER</h3>
<p className="text-xl font-medium text-dark">THE DESTROYER OF WORLDS</p>

        </div>
      </div>
    </div>
  )
}

export default Banner
