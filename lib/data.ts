export type Member = {id:string;name:string;title:string;description:string;quote:string;specialty:string;rank?:string;agent?:string;ml?:string;badge?:string;avatar:number;color:string};
export const members:Member[]=[
{id:'ADAD-01',name:'ALWAN',title:'Kepala Divisi Intelijen',description:'Informasi sudah lengkap. Keputusan tetap berdasarkan feeling.',quote:'Recon dulu. Kesimpulan belakangan.',specialty:'Pengumpulan informasi tanpa jaminan tindak lanjut.',rank:'Gold',agent:'Sova',ml:'Hanabi',avatar:0,color:'#c7ff38'},
{id:'ADAD-02',name:'BIMO',title:'Direktur Crowd Control',description:'Musuh kena stun. Teman ikut mempertanyakan keputusan.',quote:'Udah gue flash. Kelanjutannya urusan bersama.',specialty:'Pembukaan jalan dengan efek samping.',rank:'Gold',agent:'Breach',ml:'Argus',avatar:1,color:'#ffac62'},
{id:'ADAD-03',name:'DARRYL',title:'Kepala Departemen Jett',description:'Agent pool satu. Pembelaan tidak terbatas.',quote:'Kenapa belajar agent lain kalau masalahnya tim?',specialty:'Spesialisasi ekstrem pada satu pilihan.',rank:'Platinum',agent:'Jett',avatar:2,color:'#a7c8ff',badge:'JETT ONE-TRICK'},
{id:'ADAD-04',name:'NABIL',title:'Gigon',description:'Rank tertinggi di squad. Metode berpikir masih diteliti.',quote:'Satchel dulu. Kesimpulan di udara.',specialty:'Mobilitas eksplosif berbasis keyakinan.',rank:'Diamond',agent:'Raze',avatar:3,color:'#ff70c5',badge:'RAZE BRAINROT'},
{id:'ADAD-05',name:'FAHRI',title:'The Missing Fifth',description:'Kontribusi terbesar: membuat jumlah anggota tetap lima.',quote:'Last seen: dalam pencarian.',specialty:'Penelitian lapangan tanpa batas waktu.',avatar:4,color:'#c6b0e7',badge:'BELUM DITEMUKAN'}];
export const excuses=['Kekalahan ini merupakan investasi pada ukuran sampel.','Mouse sedang dalam masa probation.','Lawan menunjukkan indikasi terlalu banyak latihan.','Aim saya dikorbankan untuk menjaga keseimbangan ekosistem.','Ini bukan salah rotasi. Ini studi geografis.','Tim belum siap menerima kompleksitas strategi saya.','Secara teori menang. Praktiknya beda server.'];
export const memos=['Kalau semua maju sendiri, secara kolektif kita maju bersama.','Spike adalah tanggung jawab bersama yang dibawa satu orang.','Agent pool kecil mengurangi beban pengambilan keputusan.','Mati duluan memperpanjang waktu analisis.','Kekalahan hanya kemenangan yang belum disetujui server.','Fahri sedang menjalankan rotasi jangka panjang.'];
export const locatorSteps=['Memeriksa lobby…','Menelusuri grup…','Mengecek alasan “bentar”…','Hasil: Fahri belum ditemukan.'];
export const siteConfig:{discordUrl:string|null;socials:{label:string;url:string}[]}={discordUrl:null,socials:[]};
export type ClipCategory='Clutch'|'Fail'|'Absolute Cinema';
export type Clip={id:string;title:string;category:ClipCategory;src:string;poster?:string;captions?:string};
// Gunakan URL video langsung (MP4/WebM), bukan URL halaman YouTube.
export const clips:Clip[]=[];
