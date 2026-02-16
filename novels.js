fetch("novels.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("novels-container");
    
    data.forEach(novel => {
      let state = "cover"; // cover | info | soon
      
      const card = document.createElement("div");
      card.className = "sec";
      card.style.cursor = "pointer";
      
      function renderCover() {
        card.innerHTML = `
          <img src="${novel["casing-path"]}" style="width:100%;border-radius:8px;margin-bottom:10px;">
          <h3 style="font-family: MyFonty; font-size:25px;">${novel.name}</h3>
        `;
        state = "cover";
      }
      
      function renderInfo() {
        card.innerHTML = `
          <h3 style="font-family: MyFonty; font-size:25px;">${novel.name}</h3>
          <p style="color:#ccc;font-size:14px;">${novel.description}</p>
          <p style="color:#888;font-size:12px;">التصنيف: ${novel.category}</p>
          <p style="margin-top:10px;color:#aaa;font-size:12px;">اضغط مرة أخرى لفتح الرواية</p>
        `;
        state = "info";
      }
      
      function renderSoon() {
        card.innerHTML = `
          <h3 style="font-family: MyFonty; font-size:25px;">${novel.name}</h3>
          <p style="color:#aaa;">قريباً...</p>
          <p style="font-size:12px;color:#777;">اضغط للعودة</p>
        `;
        state = "soon";
      }
      
      card.onclick = () => {
        if (state === "cover") {
          renderInfo();
        } else if (state === "info") {
          if (novel["pdf-path"]) {
            // تحقق من وجود الملف قبل الفتح
            fetch(novel["pdf-path"], { method: 'HEAD' })
              .then(resp => {
                if (resp.ok) {
                  // الملف موجود، افتحه في نفس الصفحة
                  window.open(novel["pdf-path"], "_self");
                } else {
                  // الملف غير موجود، عرض "قريباً"
                  renderSoon();
                }
              })
              .catch(() => {
                renderSoon();
              });
          } else {
            renderSoon();
          }
        } else if (state === "soon") {
          renderCover();
        }
      };
      
      renderCover();
      container.appendChild(card);
    });
  });