const db = require('../models')
const fs = require('fs')
const { readFileSync } = require('fs')
const { writeFileSync } = require("fs");
const Faq = db.faq

exports.getFaqs = (req, res) => {
  const count = Number(req.query.count) ? Number(req.query.count) : 20
  // Faq.findAll({
  //   limit: count,
  //   order: ['createdAt'],
  // })
  //   .then(result => {
  //     res.status(200).json(result)
  //   })
  //   .catch(err => {
  //     res.status(500).json({message: err.message})
  //   })

  fs.readFile('public/data/faq.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.status(200).send(data);  });
}

exports.createFaq = async (req, res) => {
  // Faq.create({
  //   title: req.body.title,
  //   subtitle: req.body.subtitle,
  //   content: req.body.content
  // }).then(site => {
  //   console.log(site);
  //   if (site) {
  //     res.status(200).send({
  //       message: 'Site setting created successfully',
  //     })
  //   } else {
  //     res.status(400).send({
  //       message: 'Please try again',
  //     })
  //   }
  // }).catch(err => {
  //   console.log(err);
  //   res.status(500).send({message: 'Server error'})
  // })

  const{ title, subtitle, content, summary} = req.body;

  let data = JSON.parse(readFileSync('public/data/faq.json', 'utf8'));
  const faqs = data.categories;
  const length = faqs.length;

  const images = [
    "home.png", 
    "gear.png", 
    "man.png", 
    "hous.png", 
    "round.png", 
    "money.png",
    "group.png",
    "phone.png",
    "token.png"
  ]

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  
  const randomImage = getRandomImage();


  const createdFaq = {
    id: `${length + 1}`,
    title: title,
    image: randomImage,
    desc: summary,
    number: "1",
    subtitle: [
      {
        id: "1",
        smallTitle: subtitle,
        content: content,        
      }      
    ]    
  }
  faqs.push(createdFaq);
  const changedObject = {
    categories: faqs
  }
  try{
   await writeFileSync('public/data/faq.json', JSON.stringify(changedObject, null, 2), 'utf8');
    res.status(200).send({
      faqs: faqs,
      message: 'Site setting created successfully',});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Server error'})
  }
  
}

exports.saveFaq = async (req, res) => {
  // Faq.findOne({
  //   where: {
  //     id: req.body.id,
  //   }
  // }).then(faq => {
  //   if (!faq) {
  //     res.status(400).send({
  //       message: 'Faq not found',
  //     })
  //   }
  //   faq.title = req.body.title
  //   faq.description = req.body.description
  //   faq.content = req.body.content
  //   faq.save()
  //   res.status(200).send({
  //     message: 'Faq approved successfully',
  //   })
  // })

  const {title, subtitle, content, id, subId} = req.body;

  let data = JSON.parse(readFileSync('public/data/faq.json', 'utf8'));

  const updateArray =data.categories.map((mainItem) => {
    if(mainItem.id === id){
      const upatedSubtitle = mainItem.subtitle.map((subItem) => {
        if(subItem.id === subId){
          return {
            ...subItem,
            smallTitle: subtitle,
            content: content,
          }          
        }
        return subItem;
      });

      return {
        ...mainItem,
        subtitle: upatedSubtitle,
        title: title,
      }
    }
    return mainItem;
  });
  const changedObject = {
    "categories" : updateArray,
  }
  try{
   await writeFileSync('public/data/faq.json', JSON.stringify(changedObject, null, 2), 'utf8');
    console.log("ddddddd");
  } catch (err) {
    console.log(err);
  }

}
exports.getFaqsById = (req, res) => {
  const ID = req.query.ID
  const subID = req.query.subID
  // let option = { id: ID }
  // Faq.findOne({
  //     where:option
  // }).then(result => {
  //     res.status(200).json(result);
  // }).catch(err => {
  //     res.status(500).json({ message: err.message })
  // })

  let data = JSON.parse(readFileSync('public/data/faq.json', 'utf8'));
  const faqs = data.categories;
  let subItem;

  const faq = faqs.filter(faq => {
    return faq.id == ID
  });

  if(faq.length !== 0){
      subItem = faq[0].subtitle.filter(subItem => {
      return subItem.id == subID
    });

  }
  const result = {
    "id": faq[0].id,
    "title": faq[0].title,
    "subId": subItem[0].id,
    "subtitle": subItem[0].smallTitle,
    "content":subItem[0].content,
  }
  res.status(200).json(result);

}

exports.getFaqsList = (req, res) => {

  fs.readFile('public/data/faq.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.status(200).send(data);  });

}
