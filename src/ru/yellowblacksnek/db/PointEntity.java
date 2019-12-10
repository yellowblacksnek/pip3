package ru.yellowblacksnek.db;

import ru.yellowblacksnek.beans.Point;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="points")
public class PointEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private int id;
    @Column(name = "x")
    private String x;
    @Column(name = "y")
    private String y;
    @Column(name = "r")
    private String r;
    @Column(name = "match")
    private Boolean match;

    public PointEntity() {}

    public PointEntity(String x, String y, String r, boolean match) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.match = match;
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public Boolean getMatch() {
        return match;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PointEntity that = (PointEntity) o;
        return  Objects.equals(x, that.x) &&
                Objects.equals(y, that.y) &&
                Objects.equals(r, that.r) &&
                Objects.equals(match, that.match);
    }


}