// import MediaProgressbar from "@/components/media-progress-bar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import VideoPlayer from "@/components/video-player";
// import { courseCurriculumInitialFormData } from "@/config";
// import { InstructorContext } from "@/context/instructor-context";
// import { mediaUploadService } from "@/services";
// import { useContext } from "react";

// function CourseCurriculum() {
//   const {
//     courseCurriculumFormData,
//     setCourseCurriculumFormData,
//     mediaUploadProgress,
//     setMediaUploadProgress,
//     mediaUploadProgressPercentage,
//     setMediaUploadProgressPercentage,
//   } = useContext(InstructorContext);

//   function handleNewLecture() {
//     setCourseCurriculumFormData([
//       ...courseCurriculumFormData,
//       {
//         ...courseCurriculumInitialFormData[0],
//       },
//     ]);
//   }

//   function handleCourseTitleChange(event, currentIndex) {
//     let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
//     cpyCourseCurriculumFormData[currentIndex] = {
//       ...cpyCourseCurriculumFormData[currentIndex],
//       title: event.target.value,
//     };

//     setCourseCurriculumFormData(cpyCourseCurriculumFormData);
//   }

//   function handleFreePreviewChange(currentValue, currentIndex) {
//     let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
//     cpyCourseCurriculumFormData[currentIndex] = {
//       ...cpyCourseCurriculumFormData[currentIndex],
//       freePreview: currentValue,
//     };

//     setCourseCurriculumFormData(cpyCourseCurriculumFormData);
//   }

//   async function handleSingleLectureUpload(event, currentIndex) {
//     const selectedFile = event.target.files[0];

//     if (selectedFile) {
//       const videoFormData = new FormData();
//       videoFormData.append("file", selectedFile);

//       try {
//         setMediaUploadProgress(true);
//         const response = await mediaUploadService(
//           videoFormData,
//           setMediaUploadProgressPercentage
//         );
//         if (response.success) {
//           let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
//           cpyCourseCurriculumFormData[currentIndex] = {
//             ...cpyCourseCurriculumFormData[currentIndex],
//             VideoUrl: response?.data?.url,
//             public_id: response?.data?.public_id,
//           };
//           setCourseCurriculumFormData(cpyCourseCurriculumFormData);
//           setMediaUploadProgress(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }

//   // console.log(courseCurriculumFormData);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Create Course Curriculum</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Button onClick={handleNewLecture}>Add Lecture</Button>
//         {mediaUploadProgress ? (
//           <MediaProgressbar
//             isMediaUploading={mediaUploadProgress}
//             progress={mediaUploadProgressPercentage}
//           />
//         ) : null}
//         <div className="mt-4 space-y-4">
//           {courseCurriculumFormData.map((curriculumItem, index) => (
//             <div className="border p-5 rounded-md">
//               <div className="flex gap-5 items-center">
//                 <h3 className="font-semibold">Lecture {index + 1}</h3>
//                 <Input
//                   name={`title-${index + 1}`}
//                   placeholder="Enter Lecture title"
//                   className="max-w-96"
//                   onChange={(event) => handleCourseTitleChange(event, index)}
//                   value={courseCurriculumFormData[index]?.title}
//                 />
//                 <div className="flex item-center space-x-2">
//                   <Switch
//                     onCheckedChange={(value) =>
//                       handleFreePreviewChange(value, index)
//                     }
//                     checked={courseCurriculumFormData[index]?.freePreview}
//                     id={`freePreview-${index + 1}`}
//                   />
//                   <Label htmlFor={`freePreview-${index + 1}`}>
//                     Free Preview
//                   </Label>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 {courseCurriculumFormData[index]?.videoUrl ? (
//                   <div className="flex gap-3">
//                     <VideoPlayer
//                       url={courseCurriculumFormData[index]?.videoUrl}
//                       width="450px"
//                       height="200px"
//                     />
//                     <Button>Replace video</Button>
//                     <Button className="bg-red-900">Delete Lecture</Button>
//                   </div>
//                 ) : (
//                   <Input
//                     type="file"
//                     accept="video/*"
//                     onChange={(event) =>
//                       handleSingleLectureUpload(event, index)
//                     }
//                     className="mb-4"
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default CourseCurriculum;




import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext, useRef } from "react";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const fileInputRefs = useRef([]);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const videoFormData = new FormData();
    videoFormData.append("file", selectedFile);

    try {
      setMediaUploadProgress(true);
      const response = await mediaUploadService(
        videoFormData,
        setMediaUploadProgressPercentage
      );

      if (response.success) {
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
          ...cpyCourseCurriculumFormData[currentIndex],
          videoUrl: response?.data?.url,
          public_id: response?.data?.public_id,
        };
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setMediaUploadProgress(false);
    }
  }

  function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData.splice(currentIndex, 1);
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lecture</Button>

        {mediaUploadProgress && (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        )}

        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={curriculumItem.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                    checked={curriculumItem.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
                </div>
              </div>

              <div className="mt-6">
                {curriculumItem.videoUrl ? (
                  <div className="flex gap-3 items-center">
                    <VideoPlayer url={curriculumItem.videoUrl} width="450px" height="200px" />

                    {/* Hidden file input for replacing video */}
                    <input
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(event) => handleSingleLectureUpload(event, index)}
                    />

                    {/* Replace Video Button */}
                    <Button onClick={() => fileInputRefs.current[index]?.click()}>
                      Replace video
                    </Button>

                    {/* Delete Lecture Button */}
                    <Button className="bg-red-900" onClick={() => handleDeleteLecture(index)}>
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(event) => handleSingleLectureUpload(event, index)}
                    className="mb-4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
