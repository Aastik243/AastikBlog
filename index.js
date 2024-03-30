import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";

const app=express();
const port=3000;
var forms=[];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const homeContent="Welcome to our blog, where words come to life and ideas find their voice. Dive into a captivating journey of diverse topics, from thought-provoking insights to practical tips, curated just for you. Explore a blend of engaging narratives and informative content, crafted to inspire, inform, and entertain. Join our community of avid readers and passionate writers as we embark on a quest for knowledge and creativity. Whether you seek the latest trends, expert advice, or a moment of literary escape, our blog is your digital sanctuary. Unleash your curiosity and embark on a seamless voyage through the captivating realms of our online haven."
const aboutContent="At Aastik's Blog, we're not just a website; we're a thriving community where your thoughts and stories take center stage. Unleash your creativity in an environment that not only allows you to write, edit, and delete blogs at your whim but encourages you to shape your digital identity. Whether you're passionate about sharing life experiences, delving into niche interests, or exploring the latest trends, Aastik's Blog is your canvas.Our intuitive platform caters to everyone – from seasoned wordsmiths to those taking their first steps into the world of blogging. The power is in your hands to pen down your thoughts, revise them as you see fit, and even hit delete when inspiration takes a new turn. Join a diverse and supportive community of fellow bloggers, where ideas flow freely, and every blog contributes to the rich tapestry of our collective narrative.Embark on a journey where your words resonate and connect with a global audience. Aastik's Blog is more than a space for content – it's a celebration of individuality, creativity, and the limitless possibilities of the written word. Welcome to a space where your stories find a home and your voice echoes far beyond the digital realm."
app.get("/", (req, res) => {
    res.render("home.ejs", {content:homeContent, posts:forms});
    
  });

  app.get("/about", (req, res) => {
    res.render("about.ejs", {contentA:aboutContent});
  });

  app.get("/contact", (req, res) => {
    res.render("contact.ejs");
  });

  app.get("/compose", (req, res) => {
    res.render("compose.ejs");

  });

  app.post("/submit",(req,res)=>{
    const form = {
      formText:req.body["text"],
      formName:req.body["name"],
      formDate:req.body["date"],
      formTitle:req.body["title"]};
  
      forms.push(form);
      res.redirect("/");
  })

  app.get("/posts/:post", (req,res)=>{

    const post_match = _.lowerCase(req.params["post"]);

    forms.forEach(function(form){

      if(form.formTitle == post_match){
        res.render("post.ejs",{post1:form});
        
      }
      else{
        console.log("not a match");
        
      }});
  })


  
  

  




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });