import React from 'react'
import "./FeaturedCompanies.css"

function FeaturedCompanies() {
  return (
    <div className="featured-container w-20 mt-5">
      <div className="card-box card-fixed-1 my-4">
        <h4 style={{ margin: 0, fontSize: "14px" }}>See 31 jobs in Featured Companies</h4>
        <div className="company-logos">
          <a href="https://www.proptiger.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.naukimg.com/logo_images/groups/v1/2472988.gif" alt="PropTiger" height="30px" weight="50px" />
          </a>
          <a href="https://www.walterbushnell.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.naukimg.com/fc_images/v2/314023.gif" alt="Walter Bushnell" height="30px" weight="50px" />
          </a>
          <a href="https://www.spectranet.in" target="_blank" rel="noopener noreferrer">
            <img src="https://img.naukimg.com/fc_images/v2/103944.gif" alt="Spectranet" height="30px" weight="50px" />
          </a>
          <a href="https://www.iqvia.com" target="_blank" rel="noopener noreferrer">
            <img src="https://img.naukimg.com/fc_images/v2/1354.gif" alt="IQVIA" height="30px" weight="50px" />
          </a>
          <a href="https://www.jubileelifesciences.in" target="_blank" rel="noopener noreferrer">
            <img src="https://img.naukimg.com/fc_images/v2/100007.gif" alt="Jubilee Life Sciences" height="30px" weight="50px" />
          </a>
          <a href="https://www.naukri.com/mphasis-jobs-careers-6481?keyword=it&src=fcc&companyId=144993" target='_blank' rel="noopener noreferrer">
            <img src="https://img.naukimg.com/fc_images/v2/144993.gif" alt="" />
          </a>
        </div>
      </div>
      <div className="card-box card-fixed-2 my-4 top-6 mt-4">
        <img
          src="https://static.naukimg.com/s/0/0/i/new-logos/ffLogo.png"
          alt="Naukri FastForward"
          className="naukri-logo"
        />
        <p className="naukri-title">Get 3X more profile views from recruiters</p>
        <p className="naukri-description">
          Increase your chances of callback with Naukri FastForward
        </p>
        <a
          href="https://resume.naukri.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="know-more-link"
        >
          Know More
        </a>
      </div>
    </div>
  )
}

export default FeaturedCompanies