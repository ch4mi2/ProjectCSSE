package com.csse.server.service;

import com.csse.server.model.Invoice;
import com.csse.server.model.Order;
import com.csse.server.repository.InvoiceRepository;
import com.csse.server.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository repo;

    public Invoice addInvoice(Invoice payload) {
        return repo.insert(payload);
    }

    public List<Invoice> allInvoices() {
        return repo.findAll();
    }

}
