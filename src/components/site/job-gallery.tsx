import Image from "next/image";

type JobPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  featured?: boolean;
};

const PHOTOS: JobPhoto[] = [
  {
    src: "/images/jobs/driveway-pressure-cleaning-brisbane-townhouse.webp",
    alt: "WSI Cleaning technician pressure washing a townhouse facade and driveway in Brisbane",
    width: 1600,
    height: 1067,
    featured: true,
  },
  {
    src: "/images/jobs/house-washing-brisbane-townhouse-facade.webp",
    alt: "House washing a two-storey townhouse exterior in Brisbane",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/jobs/driveway-pressure-cleaning-brisbane-aerial.webp",
    alt: "Aerial view of a concrete driveway being pressure cleaned outside Brisbane townhouses",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/jobs/soft-wash-cladding-brisbane-closeup.webp",
    alt: "Close-up of a wash wand rinsing weatherboard cladding on a Brisbane home",
    width: 1600,
    height: 2400,
  },
  {
    src: "/images/jobs/house-washing-brisbane-exterior-wall.webp",
    alt: "Exterior wall and cladding being washed during a house wash in Brisbane",
    width: 1600,
    height: 2400,
  },
  {
    src: "/images/jobs/townhouse-complex-cleaning-brisbane-aerial.webp",
    alt: "Aerial view of a townhouse complex driveway cleaned by WSI Cleaning in Brisbane",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/jobs/clean-townhouse-exterior-brisbane.webp",
    alt: "Freshly washed townhouse exterior in Brisbane",
    width: 1600,
    height: 2400,
  },
];

export function JobGallery() {
  return (
    <section className="job-gallery" id="gallery">
      <div className="section-head">
        <div className="section-head-left">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            Real jobs
          </span>
          <h2 className="section-title">
            Recent work across <em className="hl-orange">Greater Brisbane</em>.
          </h2>
        </div>
        <div className="section-head-right">
          <p>
            House washes, driveway pressure cleaning and townhouse exteriors
            photographed on the job. Same crew, same equipment, Greater Brisbane
            properties.
          </p>
        </div>
      </div>

      <ul className="job-grid">
        {PHOTOS.map((photo) => (
          <li
            key={photo.src}
            className={photo.featured ? "job-card job-card-featured" : "job-card"}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes={
                photo.featured
                  ? "(max-width: 700px) 100vw, 66vw"
                  : "(max-width: 700px) 100vw, 33vw"
              }
              loading="lazy"
              className="job-photo"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
