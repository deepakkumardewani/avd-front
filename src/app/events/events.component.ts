import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any;
  assetPath = '../../assets/banner-images/';

  // events = [
  //   {
  //     name: 'Gaur Purnima',
  //     // tslint:disable-next-line:max-line-length
  //     desc: `Gaur Purnima is a Gaudiya Math Festival, which is celebrated on the Divine appearance of Shri Chaitanya Mahaprabhu.<br><br>The word “Gaur Purnima” means “golden full moon” which signifies that Lord Chaitanya appeared at the time of full moon and He blesses everyone with the moonlike rays of His teachings.<br><br>Devotees at “Anand Vrindavan Dham” celebrate this eve with great joy and pomp. They start their day with a grand Sankirtan performed with great enthusiasm, which is held after the Mangal Aarti and they sing the glories of Sri Chaitanya Mahaprabhu.<br><br> There is an akhand (nonstop) Hari Naam Sankirtan in the temple where all the devotees dance and sing in the mood of ecstasy. There is an enlightening feeling of spirituality all around.<br><br>The Hare Krishna Mahamantra when combined with the mrudangas and kartals, creates a deep feeling of devotion in all the devotees and they all dance in front of the Lord feeling one with Chaitanya Mahaprabhu.<br><br> At dusk, a Grand Abhishek of Shri Gaur Nitai is performed and various foodstuffs are offered to the Lord.<br><br>Devotees break their fast with the charnamrita and honour prasadam.<br><br>Lord Chaitanya is not different than Krishna. He spread the congregation chanting of the Holy name and taught that one can gain enlightenment by chanting...<br>Hare krishna Hare Krishna Krishna Krishna Hare Hare<br><br>Hare Rama Hare Rama Hare Rama Rama Rama Hare Hare`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Guru Purnima',
  //     desc: `The Spiritual Master is equated with GOD and always regarded as the holy link between the living entities and GOD. On this day, all the spiritual aspirants and devotees worship Vyasadeva and His representative –that is the Spiritual Master.<br><br>This event is most special to all the devotees of “Anand Vrindavan Dham”, as they feel that they would not have got Krishna Consciousness without their Spiritual Master – their Guru.<br><br>A large number of devotees gather all around the world and charan abhishek is performed on their Spiritual Master and a special Guru Aarti also takes place followed by the Vyas Puja offerings by the devotees.<br><br>In the evening, devotees from different corners gather and a special cultural programme is arranged, wherein devotees perform traditional dance acts and dramas highlighting the importance of a Spiritual Master in everyone’s life.<br><br>Thereafter, a Grand Feast is also organized for all the devotees in the temple.<br><br>yasya prasãdãd bhagvat-prasãdo<br>yasyãprasãdãnnagatihkuto pi<br>ghyãyan stuvamstasyayaśastri-sandhyam<br>vande guroh śri-caranavrvindam<br> "By the mercy of the spiritual master one receives the benediction of Krishna. Without the grace of spiritual master, one cannot make any advancement. Therefore, I should always remember and praise the spiritual master. At least three times a day I should offer my respectful obeisance’s unto the lotus feet of my spiritual master."`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Shri Krishna Janamashtami',
  //     desc: `The Auspicious day of the appearance of Lord Krishna is celebrated as Krishna Janmashtami in the whole world.<br><br>It is celebrated on the eight day of the Krishna Paksha in the month of Shravan. Lord Krishna appeared as the son of Vasudev in Mathura and performed various pastimes.<br><br>Anand Vrindavan Dham is reputed to celebrate one of the largest Janmashtami celebrations within Thane District.<br><br>Preparations for this event start a month in advance and the devotees here work tirelessly for days to make this event a great success. A Sankirtan is held after Mangal Aarti which comprises of many people singing the glories of Lord Krishna and His Pastimes.<br><br>The deities of Radha Vrindavan Chandra are marvelously dressed in new attires in the morning and a special Janmashtami Darshan is also performed in the evening, wherein their beauty is embellished with new ornaments and jewellery. The entire temple is also magnificently decorated with colorful flowers, garlands and grand lighting.<br><br>A joyful festive mood sets in for the whole day and all devotees are engaged in various services to ensure a comfortable Darshan of the deities. In the evening, thousands of devotees assemble in the temple for a cultural programme comprising of many skits and spiritual dances enacting the pastimes of Lord Krishna, which truly enchant all the visitors.<br><br>A Grand Abhishek is performed at midnight for the small Shri Radha Vrindavan Chandra deities with deep devotion.<br><br>The devotees break their fast with abhishek jal of the Lord and have the benefit of a transcendental feast that is arranged for all.`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Radha Ashtami',
  //     desc: `Radha Ashtami is the divine appearance of Shrimati Radha Rani, the eternal consort of the Supreme personality of Godhead.<br><br>Shrimati Radha Rani’s glorious birth occurred on the 15 th  day of the birth of Lord Krishna.<br><br>Devotees at “Anand Vrindavan Dham” rejoice this day with deep devotion and love. The deities are dressed in new outfits and the temple is decorated lavishly with flowers.<br><br>All the devotees sing the glories of Shrimati Radha Rani. A Grand abhishek is performed of Shri Radha Vrindavan Chandra at noon with panchamrta.<br><br>After Abhishek, 56 sacred items of food (Chhapan Bhog) is offered to the Lord and a Grand Aartiis also performed.<br><br>On this divine &amp; auspicious day, all the devotees are obliged by the most divine darshan of the Lotus feet of Shrimati Radha Rani. This moment is always awaited by all the devotees as such sight occurs only once in a year at the Sandhya Arti of Shri Radha Ashtami Mahautsav.<br> This day is very special to the Gaudiya devotees, as only by the Grace of Shrimati Radha Rani can one attain Lord Krishna’s mercy and devotion.`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Narsingh Jayanti',
  //     desc: `Narsingh Jayanti is the Divine appearance day of Lord Narsingh Dev - Lord Krishna’s man-lion incarnation, who removes all obstacles on the path of devotional service out of compassion.<br><br>At Anand Vrindavan Dham, this event is very special to all the devotees.<br><br>At dusk,Abhishek of Lord Narsingh Dev is performed which is followed by a grand Sandhya Aarti in which all devotees sing and dance with devotion in front of the Lord. A large number of devotees assemble within the temple premises and take the bliss of spirituality by hearing the loving pastimes of Lord Narsinga Dev by HG Shri Madhusudan Bapuji.<br><br>Since this incarnation has performed unbelievable miracles in the lives of several devotees, there is a natural enthusiasm amongst all, which fills the atmosphere with great joy.`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Madhusudan Bapuji Vyas Puja',
  //     desc: `30th October 1962... the appearance day of a Great Personality of today’s time, who appeared for uplifting the fallen souls from this kaliyug to Golok Dham.<br><br>Shri Madhusudan Bapuji’s appearance means appearance of Krishna Consciousness, appearance of Krishna’s Love, appearance of happiness, sacrifice, and selfless devotion. His appearance is like a huge ship that can encompass all living beings and help them cross over the turbulent waters of life. He has come into this material world leaving Golok Dham just for relieving the fallen souls from all pain and sadness.<br><br>Shri Krishna Bhakt Parivar celebrates Bapuji’s Vyas Puja (appearance day) with utmost joy and enthusiasm. It starts special Mangala Aarti and Guru Puja followed by Harinam Sankirtan from, in which all the devotees dance in joy. A special Vyas Puja program is also held within the temple premises in the afternoon, which is attended by all devotees.<br><br>Disciples from all around the world send their Vyas Puja offerings for Bapuji to thank him for showing them the path towards Krishna Consciousness and being their constant source of inspiration.<br>The evening event is witnessed by all the devotees wherein special cultural events are held glorifying the divine qualities of their Spiritual Master HG Shri Madhusudan Bapuji, followed by Maha Prasadam for all the devotees.`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   },
  //   {
  //     name: 'Rath Yatra',
  //     desc: `Jagannath Ratha Yatra is a major Hindu festival associated with Lord Jagannath (avatar of Lord Vishnu) held at Puri in India during the months of June or July.<br><br>The Puri Rath Yatra is world famous and attracts more then one million pilgrims every year, not only from India but also from the different parts of the world. Rath Yatra in other words the Chariot Festival is the only day when Lord Himself comes on the streets to give Darshan to the devotees who do not come in the temple.<br>Shri Krishna Bhakt Parivaar celebrates this festival with an energetic spirit. The deities of Shri Jagannath Baldev & Subhadra are made to sit on the chariot and brought to the streets of Ulhasnagar. The streets of the city are filled with the divine sound, "Jai Jagannath". There is dance, kirtan, joy &; ecstasy everywhere. The devotees dance along the roads. The chariot of Shri Jagannath is welcomed at various parts of the city. Jagannath Rath Yatra is one of the biggest festival celebrated at Anand Vrindavan Dham.`,
  //     image: 'SMB.jpg',
  //     date: 'Friday, March 1, 2019 / 8:00 AM : 1:00 PM'
  //   }
  // ];
  constructor(private router: Router, private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  goToDetail(event) {
    this.helperService.clearEvent();
    const name = event.title.toLowerCase().replace(/ /g, '-');
    this.helperService.setEvent(event);
    this.router.navigate([`/events/${name}`]);
  }

}
