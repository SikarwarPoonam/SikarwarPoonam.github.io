---

layout: default

title: About Me

---

# About Me

I am a researcher specializing in **Semiconductors** and **Solar Energy**. 

## Background

* **Ph.D.** in Material Science (Specialization in Crystal Growth).

* Experience with **FlexSim** and **Python** for process optimization.

## Contact

Feel free to reach out via [LinkedIn](your-linkedin-url) or email.
<div class="about-container" markdown="1">

## Behind the Site

<style>
  /* Hide the radio buttons */
  .about-tabs input[type="radio"] {
    display: none;
  }
  
  /* Style the labels to look like buttons */
  .about-tabs label {
    display: inline-block;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 15px;
    transition: background-color 0.3s;
  }
  
  .about-tabs label:hover {
    background-color: #e2e6ea;
  }
  
  /* Hide all tab content by default */
  .tab-content {
    display: none;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    line-height: 1.6;
  }
  
  /* When a radio button is checked, show the corresponding content */
  #tab-mission:checked ~ #content-mission,
  #tab-academic:checked ~ #content-academic,
  #tab-focus:checked ~ #content-focus {
    display: block;
    animation: fadeIn 0.4s;
  }
  
  /* Highlight the active tab label */
  #tab-mission:checked ~ .tab-labels label[for="tab-mission"],
  #tab-academic:checked ~ .tab-labels label[for="tab-academic"],
  #tab-focus:checked ~ .tab-labels label[for="tab-focus"] {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>

<div class="about-tabs">
  <input type="radio" name="tabs" id="tab-mission" checked>
  <input type="radio" name="tabs" id="tab-academic">
  <input type="radio" name="tabs" id="tab-focus">

  <div class="tab-labels">
    <label for="tab-mission">The Mission</label>
    <label for="tab-academic">Academic Roots</label>
    <label for="tab-focus">Current Focus</label>
  </div>

  <div id="content-mission" class="tab-content">
    <h3>Demystifying Energy & Materials</h3>
    <p>This platform is dedicated to bridging the gap between complex materials science and accessible education. The goal is to break down the technologies driving our future—from the intricacies of high-purity silicon manufacturing to the next generation of renewable energy solutions—making them understandable for everyone.</p>
  </div>
  
  <div id="content-academic" class="tab-content">
    <h3>Physics & Fundamentals</h3>
    <p>My journey in the sciences culminated in a Ph.D. in Physics from IISc Bengaluru. That academic rigor fostered a deep appreciation for the fundamental mechanisms governing material properties, which forms the backbone of the technical deep-dives on this site.</p>
  </div>

  <div id="content-focus" class="tab-content">
    <h3>From Cells to Systems</h3>
    <p>I am deeply engaged in the evolution of energy technology. This includes everything from the electrochemistry of energy storage to advanced photovoltaic architectures like TOPCon, HJT, and Perovskites, as well as the transition from indirect to direct bandgap materials.</p>
  </div>
</div>
