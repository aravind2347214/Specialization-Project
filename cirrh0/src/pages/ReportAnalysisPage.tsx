import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Info, InfoOutlined, Troubleshoot, UploadFile } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ReportAnalysisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fileTestInputRef = useRef<any>(null);
  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );

  const handleExtractParameters = ()=>{
    window.scrollTo(300,300)
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar activePage="report-analysis" />
      <div className="flex flex-col flex-1 pt-[70px] ">
        <div className="flex flex-col justify-center text-center mt-[50px] lg:w-[80%] mx-auto">
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="text-[50px] text-C11 font-bold league-spartan"
          >
            Report Analysis
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="text-[16px]"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            temporibus perspiciatis quisquam autem similique ipsum, modi minus
            qui officiis asperiores ut quos sint, beatae culpa nostrum ratione
            reprehenderit quibusdam a!
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            className="mt-[20px] text-[14px] w-[80%] mx-auto text-C11"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            officiis tempore autem maiores debitis soluta nihil consequuntur!
            Officia quaerat sapiente et perspiciatis consequuntur, nesciunt
            eveniet doloribus reprehenderit omnis soluta iure!
          </div>
          {/* {!myProfiledata?.username ? (
            <>
              <Link
                data-aos="fade-up"
                data-aos-duration="700"
                to="/login"
                className="shadow-md flex flex-row items-center gap-2 px-5 mt-[50px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]"
              >
                Try Now !
              </Link>
            </>
          ) : (
            <> */}
              <div className="flex flex-col items-center justify-between gap-3 px-2 py-5 ">
                <div className="min-w-[49%] justify-center flex flex-row gap-[100px]  mx-auto">
                  <input
                    type="file"
                    ref={fileTestInputRef}
                    className="hidden"
                  />
        
                  <button
                    data-aos="fade-up"
                    data-aos-duration="700"
                    onClick={() => {
                      fileTestInputRef.current.click();
                    }}
                    className="w-[300px] h-[200px] flex-col hover:bg-gray-100 border-dashed border-gray-300 border-[3px] rounded-[8px]  justify-center items-center flex "
                  >
                    <div className="jump-up-and-down">
                      <UploadFile sx={{ fontSize: 35, color: "#9ca3af" }} />
                    </div>
                    <div className="font-semibold text-gray-400 text-[12px]">
                      Upload All Related Test Reports
                    </div>
                  </button>
                
                </div>
                <div>

                <div className="flex flex-row items-center gap-1 mt-5 text-C11">
                  <InfoOutlined sx={{fontSize:16}}/>
                  <div
                    data-aos="fade-up" 
                    data-aos-duration="800"  
                  className=" flex flex-col text-[12px] justify-center gap-[5px]">
                Certain parameters within these documents are required to conduct the analysis.There could be errors on the extracted values
                </div>
                  </div>

                  
                  <button
                       data-aos="fade-up"
                        onClick={handleExtractParameters}
                       data-aos-duration="900" 
                       data-aos-once 
                  className="shadow-md flex flex-row gap-2 px-5 mt-[20px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]">
                    Extract Report Parameters
                  </button>
                </div>
              </div>

              <div className="flex flex-row justify-between gap-[20px]  px-[100px] mt-[50px]">
                <div className="flex flex-col gap-[20px]">
                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1000" 
                  data-aos-once 
                  className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Ascites</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className="border-gray-300 border w-[100px] py-2 px-2 mt-[5px] bg-gray-100 outline-C11 rounded-[2px] text-[12px]">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1200" 
                  data-aos-once
                   className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Edema</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className="border-gray-300 border w-[200px] py-2 px-2 mt-[5px] bg-gray-100 outline-C11 rounded-[2px] text-[12px]">
                      <option value="Y">Edema Desipite Diuretic Therapy</option>
                      <option value="S">Edema Present Without Diuretics or Edema Resolved by Diuretics</option>
                      <option value="N">No Edema and No Diuretic Therapy for Edema</option> 
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1100" 
                  data-aos-once
                  className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Spiders</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className="border-gray-300 border w-[100px] py-2 px-2 mt-[5px] bg-gray-100 outline-C11 rounded-[2px] text-[12px]">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1200" 
                  data-aos-once
                   className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Hepatomegaly</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className="border-gray-300 border w-[100px] py-2 px-2 mt-[5px] bg-gray-100 outline-C11 rounded-[2px] text-[12px]">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                </div>

                <div
                data-aos="fade-up" 
                data-aos-duration="800" 
                data-aos-once 
                className="w-1/2">
                  <div className="font-bold league-spartan text-C11 text-[25px]">
                    Analysis Parameters
                  </div>
                 
                  <div 
                     data-aos="fade-up" 
                     data-aos-duration="900" 
                  className="flex flex-wrap gap-[30px]">
                    <div
                 
                     className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Bilirubin
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3 ">
                      <div className="text-left text-C11  text-[10px]">
                        Albumin
                      </div>
                      <input
                        type="text"
                        className=" border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Copper
                      </div>
                      <input
                        type="text"
                        className=" border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Alk_Phos
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        SGOT
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Tryglicerides
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Platelets
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Prothrombin
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]"
                      />
                    </div>
                  </div>
                  <div
                     data-aos="fade-up" 
                     data-aos-duration="1000"
                     data-aos-once 
                   className="flex flex-row items-center gap-1 mt-5 text-C11">
                  <InfoOutlined sx={{fontSize:16}}/>
                  <div className=" flex flex-col text-[12px] justify-center gap-[5px]">
                  Please Note that all values are authentic and please cross check with the actual document 
                </div>
                  </div>
                </div>
              </div>
              <button
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once
                className="shadow-md flex flex-row gap-2 px-5 mt-[20px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]"
              >
                <div>
                  <Troubleshoot sx={{ color: "white" }} />
                </div>
                <div>Analyze Report</div>
              </button>
            {/* </>
          )} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportAnalysisPage;

{
  /* <div className="flex flex-col justify-start w-[100px] mt-3">
<div className="text-left text-C11  text-[10px]">Ascites</div>
<input type="text" className='py-2 px-2 bg-gray-100 outline-C11 rounded-[2px] text-[12px]'/>
</div> */
}
