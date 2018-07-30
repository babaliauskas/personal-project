update dinosaurs_cart
set quantity = $2
where id = $1;

select * from dinosaurs_cart 
where cart_id  = $3
order by id


