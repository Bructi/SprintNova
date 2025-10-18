// js/gallery.js

const supabase = window.supabaseClient;

document.addEventListener("DOMContentLoaded", async () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const uploadForm = document.getElementById("uploadForm");
  const imageInput = document.getElementById("imageInput");
  const captionInput = document.getElementById("captionInput");
  const previewImg = document.getElementById("previewImg");
  const previewCaption = document.getElementById("previewCaption");

  let galleryData = [
    { src: "assets/sample1.jpg", caption: "Coding Marathon Winners" },
    { src: "assets/sample2.jpg", caption: "Football Finals" },
    { src: "assets/sample3.jpg", caption: "Dance Night - Spandan" }
  ];

  function renderGallery(dataArray = galleryData) {
    galleryGrid.innerHTML = "";
    dataArray.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("gallery-card");
      card.innerHTML = `
        <img src="${item.image_url || item.src}" alt="Event">
        <div class="gallery-caption">${item.caption}</div>
      `;
      galleryGrid.appendChild(card);
    });
  }

  async function fetchGallery() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery:', error);
      renderGallery();
      return;
    }

    renderGallery(data);
  }

  await fetchGallery();

  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImg.src = URL.createObjectURL(file);
      previewImg.classList.remove("hidden");
    }
  });

  captionInput.addEventListener("input", () => {
    previewCaption.textContent = captionInput.value;
    previewCaption.classList.remove("hidden");
  });

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const caption = captionInput.value;
    const file = imageInput.files[0];

    if (!file || !caption) {
      alert('Please select an image and add a caption.');
      return;
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      alert('You must be logged in to upload images.');
      return;
    }
    const userId = user.id;

    const fileName = `${Date.now()}_${file.name}`;
    console.log("Uploading file:", fileName, file);

    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('gallery-images')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      alert('Failed to upload image.');
      return;
    }

    const { data: publicUrlData, error: urlError } = supabase
      .storage
      .from('gallery-images')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('Public URL error:', urlError);
      return;
    }

    const imageUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from('gallery')
      .insert([{ image_url: imageUrl, caption, uploaded_by: userId }]);

    if (insertError) {
      console.error('Error inserting gallery row:', insertError);
      alert('Failed to save gallery entry.');
      return;
    }

    uploadForm.reset();
    previewImg.src = '';
    previewImg.classList.add("hidden");
    previewCaption.classList.add("hidden");

    await fetchGallery();
  });
});
