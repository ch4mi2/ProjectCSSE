package com.csse.server.dtos;

import com.csse.server.model.Site;

public class AnalyticsDTO {
    private Site site;
    private double totalAmount;

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
