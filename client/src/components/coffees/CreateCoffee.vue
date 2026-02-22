<template>
  <div>
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee">
      <div>
        <label>ชื่อเมนู</label><br />
        <input v-model="coffee.name" type="text" required />
      </div>

      <upload-image @uploaded="onUploaded"></upload-image> <!-- เพิ่ม Component Upload -->


      <div class="mb-3 editor-wrapper">
        <label class="form-label">Preview:</label>
        <ckeditor :editor="editor" v-model="coffee.content" :config="editorConfig"></ckeditor>
      </div>


      <div>
        <label>ราคา</label><br />
        <input v-model.number="coffee.price" type="number" required />
      </div>

      <div>
        <label>ประเภท</label><br />
        <select v-model="coffee.type" required>
          <option value="">-- เลือกประเภท --</option>
          <option value="hot">Hot</option>
          <option value="iced">Iced</option>
          <option value="frappe">Frappe</option>
        </select>
      </div>

      <div>
        <label>รายละเอียด</label><br />
        <textarea v-model="coffee.description"></textarea>
      </div>

      <!-- ✅ เพิ่มสถานะเมนู -->
      <div>
        <label>สถานะ</label><br />
        <select v-model="coffee.isAvailable">
          <option :value="true">จำหน่าย</option>
          <option :value="false">หมด</option>
        </select>
      </div>

      <br />

      <button type="submit">บันทึกเมนู</button>
      <button type="button" @click="navigateTo('/coffees')">
        ยกเลิก
      </button>
    </form>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../Utils/Upload.vue' // Import

export default {
  components: {
    UploadImage // Register Component
  },
  data () {
    return {
      editor: ClassicEditor,  // 1. กำหนด Editor Build
      editorConfig: {
        licenseKey: 'GPL',
        // สามารถปรับแต่ง Toolbar ได้ตามต้องการ
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ] // 2. ตั้งค่า Toolbar
      },
      coffee: {
      name: '',
      thumbnail: null,
      pictures: null,
      content: '', // 3. ข้อมูล HTML จาก Editor จะถูกเก็บในตัวแปรนี้ 
      price: 0,
      type: '',
      description: '',
      isAvailable: true
    }
    }
  },
  methods: {
     // รับชื่อไฟล์จาก Component ลูก
    onUploaded (filename) {
      this.coffee.thumbnail = filename
      console.log('Thumbnail set to:', filename)
    },
    async createCoffee () {
  try {

    if (!this.coffee.thumbnail) {
      alert('กรุณาอัปโหลดรูปก่อน')
      return
    }

    await CoffeesService.post(this.coffee)

    alert('เพิ่มเมนูกาแฟเรียบร้อย')
    this.$router.push('/coffees')

  } catch (err) {
    console.log(err)
  }
},
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
/* ปรับแต่ง CSS เฉพาะส่วน Editor */
.editor-wrapper {
    text-align: left;
}
/* แก้ไขความสูงขั้นต่ำของ Editor ให้พิมพ์ง่ายขึ้น */
:deep(.ck-editor__editable) {
    min-height: 300px;
}
</style>
