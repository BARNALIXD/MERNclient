import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from "@/services";
import { Upload } from "lucide-react";
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

  const bulkUploadInputRef = useRef(null);

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

    if (selectedFile) {
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
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if(deleteCurrentMediaResponse?.success){
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  function handleOpenBulkUploadDailog(){
    bulkUploadInputRef.current?.click();
  }

 function areAllCourseCurriculumFormDataObjectsEmpty(arr){
   
  return arr.every((obj) => {
    return Object.entries(obj).every(([key, value]) =>{
      if(typeof value)
    })
  })
 }

  async function handleMediaBulkUpload(event){
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach(fileItem => bulkFormData.append('files', fileItem));

    try{

      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(bulkFormData,   setMediaUploadProgressPercentage)

      console.log(response, "bulk");
      if(response?.success){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];


        console.log(cpyCourseCurriculumFormData, 'cpyCourseCurriculumFormData');

      }

    }catch(e){
      console.log(e);

    }

  }


  function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];

    cpyCourseCurriculumFormData.splice(currentIndex, 1);
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  return (
    <Card>
      <CardHeader className={"flex flex-row justify-between"}>
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
          type="file"
          ref={bulkUploadInputRef}
          accept="video/*"
          multiple
          className="hidden"
          id="bulk-media-upload"
          onChange={handleMediaBulkUpload}

          />
          <Button
          as="label"
          htmlFor= "bulk-media-upload"
          variant="outline"
          className="cursor-pointer"
          onClick={handleOpenBulkUploadDailog}
          >
            <Upload className="w-4 h-5 mr-2"/>
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button>

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
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={curriculumItem.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>

              <div className="mt-6">
                {curriculumItem.videoUrl ? (
                  <div className="flex gap-3 items-center">
                    <VideoPlayer
                      url={curriculumItem.videoUrl}
                      width="450px"
                      height="200px"
                    />

                    <input
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(event) =>
                        handleSingleLectureUpload(event, index)
                      }
                    />

                    <Button onClick={() => handleReplaceVideo(index)}>
                      Replace video
                    </Button>

                    <Button
                      className="bg-red-900"
                      onClick={() => handleDeleteLecture(index)}
                    >
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(event) =>
                      handleSingleLectureUpload(event, index)
                    }
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
