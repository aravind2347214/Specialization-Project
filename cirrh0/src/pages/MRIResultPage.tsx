import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { dummyMRIresult } from '../data/data';

function MRIResultPage() {

    useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        let urlParams = new URLSearchParams(queryString);
        const reportId = urlParams.get("id");
        console.log("ReportID in MRI Report Page : ", reportId);
        // if (taskId) {
        //   getTaskData(taskId)
        // }
        // else{
        //   navigate("*")
        // }
      }, []);


  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar activePage="mri-result" />
      <div className="flex-1 pt-[120px]  px-[150px] justify-center flex flex-col gap-2">
        <div className="league-spartan font-bold text-[50px] text-C11">
          MRI Result
        </div>
        <div className="my-10 flex flex-row gap-[50px] ">
          <div className="flex flex-col gap-[30px] w-1/2">
          {/* Inflamatino and fibrosis */}
          <div className=' flex flex-row gap-[20px]'>
          <div className="flex flex-col px-5 py-3  rounded-[6px]">
            <div className="league-spartan font-bold text-[25px] text-gray-800">
              Liver Inflamation
            </div>
            <div className="league-spartan font-semibold text-[100px] border-2 border-C11 text-C11 bg-gray-100 w-fit flex text-center justify-center items-center px-5 py-2 ">
              {dummyMRIresult.inflamation}
            </div>
          </div>

          <div className="flex flex-col px-5 py-3  rounded-[6px]">
            <div className="league-spartan font-bold text-[25px] text-gray-800">
              Liver Fibrosis
            </div>
            <div className="league-spartan font-semibold text-[100px] border-2 border-C11 text-C11 bg-gray-100 w-fit flex text-center justify-center items-center px-5 py-2 ">
              {dummyMRIresult.fibrosis}
            </div>
          </div>




          </div>

          {/* Analysis */}
          <div className="flex flex-col px-5 py-3  rounded-[4px]">
          <div className="league-spartan font-bold text-[25px] text-gray-800">Analysis</div>
          <div className="border-l-[5px] border-transparent text-[15px] text-justify">{dummyMRIresult.analysis}</div>
          </div>

          {/* lifestyle */}
          <div className="flex flex-col px-5 py-3 rounded-[4px]">
          <div className="league-spartan font-bold text-[25px] text-gray-800">Lifestyle Recommendations</div>
          <div className="flex flex-col gap-2 mt-2">
            {dummyMRIresult.lifestyle_recommendations.map((node: any) => (
              <div className=" p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px] border-l-[5px]  hover:border-C11 border-gray-200   hover:font-semibold ">{node}</div>
            ))}
          </div>
          </div>
          </div>


          <div className="flex flex-col gap-[30px] w-1/2 ">

          {/* Image for  analysis */}
          <div>
            <img src={dummyMRIresult.imageURL} alt={"mri-image"}className="aspect-auto w-[300px]"/>
          </div>


            {/* precautions */}
            <div className="flex flex-col  py-3  rounded-[4px]">
            <div className="league-spartan font-bold text-[25px] text-gray-800">Precautions</div>
            <div className="flex flex-col gap-2">
              {dummyMRIresult.precautions.map((node: any) => (
                <div className=" p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px] border-l-[5px]  hover:border-C11 border-gray-200   hover:font-semibold ">{node}</div>
              ))}
            </div>
            </div>
          {/* Self Treatment Plan */}

          <div className="flex flex-col  py-3  rounded-[4px]">
          <div className="league-spartan font-bold text-[25px] text-gray-800">Doctors you might want to visit</div>
          <div className="flex flex-row gap-[20px]">
            {dummyMRIresult.doctor_type.map((node: any) => (
              <div className=" p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px]   hover:font-semibold ">{node}</div>
            ))}
          </div>
          </div>

          <div className="flex flex-col  py-3  rounded-[4px]">
          <div className="league-spartan font-bold text-[25px] text-gray-800">Self Treatment Plan</div>
          <div className="flex flex-col gap-2">
            {dummyMRIresult.self_treatment_plan.map((node: any) => (
              <div className=" p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px] border-l-[5px]  hover:border-C11 border-gray-200   hover:font-semibold ">{node}</div>
            ))}
          </div>

          </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MRIResultPage
