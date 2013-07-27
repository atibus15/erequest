<?php
//@ Author  : atibus
//@ Date    : 09/276/2013
//@ Uploader Module;

class Uploader
{

    private $new_directory;

    private $application_code;

    private $upload_full_path;

    private $files;

    private $filenames;

    public function __construct()
    {
        ;
    }

    public function setAppCode($new_applicaton_code)
    {
        $this->application_code = $new_applicaton_code;
        return $this;
    }

    public function getAppCode()
    {
        return $this->application_code;
    }

    public function setNewDirectory($new_dir_name)
    {
        $this->new_directory = $new_dir_name;
        return $this;
    }

    public function getNewDirectory()
    {
        return $this->new_directory;
    }

    //@param new_file_keys = eg array(array(id=>'1','desc'=>'Drivers License'));
    public function setFiles($new_files=array())
    {
        $this->files = $new_files;
    }

    //return files and with new filename if already validated;
    public function getFiles()
    {
        return $this->files;
    }

    private function createNewDirectory()
    {
        $upload_full_path = UPLOAD_DIR.$this->application_code.'/'.$this->new_directory;

        if(!mkdir($upload_full_path))
        {
            throw new RuntimeException("Error: Unable to create user directory, no permission to write file.", 1);
        }

        $this->upload_full_path = $upload_full_path;

        return $this;
    }

    
    private function getExt($filename)
    {
        $file_array = explode('.', $filename);

        $filename_pieces = count($file_array);

        $ext_key = $filename_pieces - 1;

        $true_extension = trim($file_array[$ext_key]);

        return $true_extension;
    }

    public function saveAttachement()
    {
        $this->validate();

        $this->createNewDirectory();

        $file_len = count($this->files);

        for($i=0; $i<$file_len; $i++)
        {
            $file           = $this->files[$i];
            $uploaded_file  = http_file($file['id']);

            $new_filename   = $this->files[$i]['newfilename'];

            $new_file_path  = $this->upload_full_path.'/'.$new_filename;
            
            $tempname       = $uploaded_file['tmp_name'];

            if(!move_uploaded_file($tempname, $new_file_path))
            {
                throw new RuntimeException("Error : Something went wrong while uploading files.");
            }
        }
        return true;        
    }

    private function validate()
    {
        $valid_formats  = array("jpg","jpeg", "png", "gif","pdf");

        $file_len = count($this->files);

        for($i=0; $i<$file_len; $i++)
        {
            $file           = $this->files[$i];

            $uploaded_file  = http_file($file['id']);
            $filename       = $uploaded_file['name'];
            $size           = $uploaded_file['size'];
            $ext            = $this->getExt($filename);
            
            // set the file new filename.. use in database and upload;
            $this->files[$i]['newfilename'] = time() + $file['id'].'.'.$ext;

            //validate file ext and size;
            if(!in_array(strtolower($ext),$valid_formats))
            {
                throw new Exception($file['description'].' is invalid.', 1);
            }
            if($size > (1024 * 1024) * 2) // system standard upload filesize..
            {
                throw new Exception($file['description'].' filesize is larger than 2MB.', 1);
            }
        }
    }
}