package com.matrix.webserver.tools;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * @ClassName ImageFileIOTool
 * @Author Create By matrix
 * @Date 2024/1/14 0014 20:16
 */
public class ImageFileIOUtil {
    /***
     * 写入图片文件到后台物理位置
     * @param system_Path
     * @param user_info_Path
     * @param filename
     * @param file
     * @return
     */
    public static boolean writeImage(String system_Path, String user_info_Path, String filename, MultipartFile file){
        try {
            file.transferTo(new File(system_Path+user_info_Path+filename));
            System.out.println(TimeUtil.GetTime(true)+"\t上传文件成功:"+filename);
            return true;
        } catch (IOException e) {
            System.out.println(TimeUtil.GetTime(true)+"\t上传异常:"+e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 写入多个图片到后台物理位置
     * @param system_Path
     * @param user_info_Path
     * @param files
     * @return
     */
    public static boolean writeImages(String system_Path, String user_info_Path, List<MultipartFile> files){
        try {
            for(int i=0;i<files.size();i++){
                files.get(i).transferTo(new File(system_Path+user_info_Path+files.get(i).getOriginalFilename()));
            }
            System.out.println(TimeUtil.GetTime(true)+"\t上传文件成功");
            return true;
        } catch (IOException e) {
            System.out.println(TimeUtil.GetTime(true)+"\t上传异常:"+e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 从后台物理位置中将图片删除
     * @param system_Path
     * @param user_info_Path
     * @param filename
     */
    public static void deleteImage(String system_Path,String user_info_Path,String filename){
        File delete_cache=new File(system_Path+user_info_Path+filename);
        if(delete_cache.exists()){
            delete_cache.delete();
            System.out.println(TimeUtil.GetTime(true)+"\t删除成功");
        }else{
            System.out.println(TimeUtil.GetTime(true)+"\t删除异常");
        }
    }

    /**
     * 将图片的byte数组写入后台位置
     * @param bytes
     * @param file_Path_Name
     * @throws IOException
     */
    public static boolean writeByteArrayToFile(byte[] bytes,String file_Path_Name) throws IOException {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file_Path_Name);
            fos.write(bytes);
            System.out.println("图片写入成功!"+file_Path_Name);

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        } finally {
            if (fos != null) {
                fos.close();
            }
        }
    }

    public static String writeImageResized(String icon_name,String image_name,String root_dir,
                                           String product_dir,MultipartFile file,boolean resize){
        // 处理文件上传
        System.out.println("图片文件:"+image_name);
        try{
            if(resize){
                // 创建文件路径
                Path originFilePath = Paths.get(root_dir+product_dir + image_name);
                // 保存文件到服务器
                Files.write(originFilePath, file.getBytes());
            }
            //压缩处理
            String filePath = root_dir+product_dir+ icon_name;
            // 将上传的图片保存到磁盘
            file.transferTo(new File(filePath));
            // 使用Thumbnailator压缩图片
            File resizedFile = new File(root_dir + product_dir+icon_name);
            Thumbnails.of(new File(filePath))
                    .size(64, 64) // 设置目标尺寸为64x64像素
                    .toFile(resizedFile);
            // 返回成功信息
            return "success";
        }catch (IOException e){
            return e.getMessage();
        }
    }

    /**
     * 获取图片后缀名
     * @param file
     * @return
     */
    public static String getSuffix(MultipartFile file){
        String originalFileName = file.getOriginalFilename();
        String image_suffix=originalFileName.substring(originalFileName.lastIndexOf(".") + 1).toLowerCase();//后缀
        return image_suffix;
    }
}
