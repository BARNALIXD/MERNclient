import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { useContext } from "react";

function CourseSettings() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

    aysnc function handleImageUploadChange(event){
          const selectedImage = event.target.files[0];

          if(selectedImage){
            const imageFormData = new FormData();
            imageFormData.append('file', selectedImage);

            try{

            }catch(e){
              console.log(e);
            }
          }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload Course Image</Label>
          <Input onChange={handleImageUploadChange}type="file" accept="image/*" />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSettings;
