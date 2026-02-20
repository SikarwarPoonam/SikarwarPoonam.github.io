<div class="about-container" markdown="1">

## Behind the Site

<div class="about-tabs">
  <button class="tab-link active" onclick="openSection(event, 'Mission')">The Mission</button>
  <button class="tab-link" onclick="openSection(event, 'Background')">Academic Roots</button>
  <button class="tab-link" onclick="openSection(event, 'Research')">Current Focus</button>
</div>

<div id="Mission" class="tab-content" style="display: block;">
  <h3>Demystifying Energy & Materials</h3>
  <p>This platform is dedicated to bridging the gap between complex materials science and accessible education. The goal is to break down the technologies driving our future—from the intricacies of high-purity silicon manufacturing to the next generation of renewable energy solutions—making them understandable for everyone.</p>
</div>

<div id="Background" class="tab-content" style="display: none;">
  <h3>Physics & Fundamentals</h3>
  <p>My journey in the sciences culminated in a Ph.D. in Physics from IISc Bengaluru. That academic rigor fostered a deep appreciation for the fundamental mechanisms governing material properties, which forms the backbone of the technical deep-dives on this site.</p>
</div>

<div id="Research" class="tab-content" style="display: none;">
  <h3>From Cells to Systems</h3>
  <p>I am deeply engaged in the evolution of energy technology. This includes everything from the electrochemistry of energy storage to advanced photovoltaic architectures like TOPCon, HJT, and Perovskites, as well as the transition from indirect to direct bandgap materials.</p>
</div>

</div>

<style>
  .about-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
  }
  .tab-link {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  .tab-link:hover {
    background-color: #e2e6ea;
  }
  .tab-link.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  .tab-content {
    animation: fadeIn 0.5s;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>

<script>
function openSection(evt, sectionName) {
  var i, tabcontent, tablinks;
  
  // Hide all content blocks
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Remove the 'active' class from all buttons
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the clicked tab and add an 'active' class to the button
  document.getElementById(sectionName).style.display = "block";
  evt.currentTarget.className += " active";
}
</script>
