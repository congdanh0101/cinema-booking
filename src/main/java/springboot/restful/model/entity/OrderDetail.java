package springboot.restful.model.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Drink drink;

    @ManyToOne
    private JunkFood junkFood;

    @ManyToOne
    private Ticket ticket;
}
