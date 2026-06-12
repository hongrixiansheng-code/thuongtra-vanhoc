"use server";

import { prisma } from "database";
import { revalidatePath } from "next/cache";

export async function createContent(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;
  const contentType = formData.get("contentType") as string;
  const content = formData.get("content") as string;

  if (!lessonId || !contentType || !content) {
    return { error: "Vui lòng điền đầy đủ thông tin." };
  }

  try {
    // Validate JSON
    JSON.parse(content);
  } catch (e) {
    return { error: "Nội dung không phải là chuỗi JSON hợp lệ." };
  }

  try {
    await prisma.lessonContent.create({
      data: {
        lessonId,
        contentType,
        content
      }
    });

    revalidatePath("/admin/data");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo nội dung:", error);
    return { error: "Đã xảy ra lỗi khi tạo dữ liệu nội dung." };
  }
}

export async function updateContent(formData: FormData) {
  const id = formData.get("id") as string;
  const contentType = formData.get("contentType") as string;
  const content = formData.get("content") as string;

  if (!id || !contentType || !content) {
    return { error: "Thiếu thông tin bắt buộc." };
  }

  try {
    // Validate JSON
    JSON.parse(content);
  } catch (e) {
    return { error: "Nội dung không phải là chuỗi JSON hợp lệ." };
  }

  try {
    await prisma.lessonContent.update({
      where: { id },
      data: {
        contentType,
        content
      }
    });

    revalidatePath("/admin/data");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật nội dung:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteContent(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return { error: "Thiếu ID nội dung." };

  try {
    await prisma.lessonContent.delete({
      where: { id }
    });
    
    revalidatePath("/admin/data");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa nội dung:", error);
    return { error: "Đã xảy ra lỗi khi xóa nội dung." };
  }
}

export async function importContents(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;
  const contentsStr = formData.get("contents") as string;

  if (!lessonId || !contentsStr) {
    return { error: "Thiếu thông tin lessonId hoặc nội dung." };
  }

  try {
    const parsed = JSON.parse(contentsStr);
    if (!Array.isArray(parsed)) {
      return { error: "Dữ liệu phải là một mảng JSON." };
    }

    const dataToInsert = [];
    for (const item of parsed) {
      if (!item.contentType || !item.content) {
        return { error: "Mỗi phần tử phải có contentType và content." };
      }
      
      // Validate content JSON
      try {
        if (typeof item.content === 'string') {
          JSON.parse(item.content);
        } else {
          item.content = JSON.stringify(item.content);
        }
      } catch (e) {
        return { error: "Thuộc tính content không phải là chuỗi JSON hợp lệ." };
      }

      dataToInsert.push({
        lessonId,
        contentType: item.contentType,
        content: typeof item.content === 'string' ? item.content : JSON.stringify(item.content)
      });
    }

    if (dataToInsert.length === 0) {
      return { error: "Mảng JSON trống." };
    }

    await prisma.lessonContent.createMany({
      data: dataToInsert
    });

    revalidatePath("/admin/data");
    return { success: true, count: dataToInsert.length };
  } catch (error) {
    console.error("Lỗi khi import nội dung:", error);
    return { error: "Đã xảy ra lỗi khi xử lý JSON hoặc lưu dữ liệu." };
  }
}
