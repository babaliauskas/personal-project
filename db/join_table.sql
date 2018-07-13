select dinosaurs.dino_id, dinosaurs.name, dinosaurs_info.height, dinosaurs_info.weight, dinosaurs_info.food, dinosaurs_info.age, dinosaurs_info.miniinfo, dinosaurs_info.info, dinosaurs_info.nickname
from dinosaurs
inner join dinosaurs_info on dinosaurs.dino_id = dinosaurs_info.dino_id;