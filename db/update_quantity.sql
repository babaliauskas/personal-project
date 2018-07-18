update dinosaurs_cart
set quantity = $2
where id = $1;

select * from dinosaurs_cart 
order by id;

