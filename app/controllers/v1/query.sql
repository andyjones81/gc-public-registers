"SELECT * from publicregisterreporting as pr " +
        "left join [dbo].[AllDomainNames] as dn  on pr.accountno = dn.accountnumber " +
        "left join [dbo].[AllTradingNames] as tn " +
        "on pr.accountno = tn.accountno " +
        "where pr.remotestatus = 'operator' " +
        "and pr.account like '%" + query + "%' " +
        "or dn.domainname like '%" + query + "%' " +
        "or tn.tradingname like'%" + query + "%' " +
        "order by pr.account"